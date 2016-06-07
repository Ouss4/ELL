////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Project:  Embedded Machine Learning Library (EMLL)
//  File:     AUCAggregator.cpp (evaluators)
//  Authors:  Ofer Dekel
//
////////////////////////////////////////////////////////////////////////////////////////////////////

#include "AUCAggregator.h"

// stl
#include <algorithm>

namespace evaluators
{
    std::vector<double> AUCAggregator::Result::GetValues() const
    {
        return {auc};
    }

    void AUCAggregator::Update(double prediction, double label, double weight)
    {
        _aggregates.push_back(Aggregate{ prediction, label, weight });
    }

    AUCAggregator::Result AUCAggregator::GetResult() const
    {
        // sort aggregates by prediction
        std::sort(_aggregates.begin(), _aggregates.end());

        // collect statistics
        double sumPositiveWeights = 0.0;
        double sumNegativeWeights = 0.0;
        double sumOrderedWeights = 0.0;

        for (uint64_t i = 0; i < _aggregates.size(); ++i)
        {
            double weight = _aggregates[i].weight;

            if (_aggregates[i].label <= 0)
            {
                sumNegativeWeights += weight;
            }
            else
            {
                sumPositiveWeights += weight;
                sumOrderedWeights += sumNegativeWeights * weight;
            }
        }

        // calcluate the AUC
        Result result;
        if (sumPositiveWeights > 0 && sumNegativeWeights > 0)
        {
            result.auc = sumOrderedWeights / sumPositiveWeights / sumNegativeWeights;
        }
        
        return result;
    }

    void AUCAggregator::Reset()
    {
        _aggregates.resize(0);
    }

    bool AUCAggregator::Aggregate::operator<(const Aggregate& other) const
    {
        // order by prediction (ascending) and then by label (descending) - this will produce the most pessimistic AUC 
        if (prediction < other.prediction) return true;
        if (prediction > other.prediction) return false;
        return label > other.label;
    }

    std::vector<std::string> AUCAggregator::GetValueNames() const 
    { 
        return {"AUC"}; 
    }
}