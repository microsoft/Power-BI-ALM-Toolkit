namespace AlmToolkit.Model
{
    using BismNormalizer.TabularCompare.Core;

    class AngularComposite
    {
        public ComparisonNode ngComparison;
        public ComparisonObject dotNetComparison;

        public AngularComposite(ComparisonNode node, ComparisonObject comparisonObject)
        {
            ngComparison = node;
            dotNetComparison = comparisonObject;
        }
    }
}
