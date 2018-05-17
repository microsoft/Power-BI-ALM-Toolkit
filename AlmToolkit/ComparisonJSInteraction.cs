namespace AlmToolkit
{
    using BismNormalizer.TabularCompare.Core;
    using BismNormalizer.TabularCompare;
    using Model;
    using Newtonsoft.Json;
    using System.Collections.Generic;

    public class ComparisonJSInteraction
    {
        // List to be used to populate data in grid control
        public static List<ComparisonTree> comparisonList = new List<ComparisonTree>();
        private Comparison _comparison;

        #region Public properties
        public Comparison Comparison
        {
            get { return _comparison; }
            set { _comparison = value; }
        }
        #endregion

        /// <summary>
        /// Method that sends flattened comparison object to Angular control
        /// </summary>
        /// <returns></returns>
        public string GetComparisonList()
        {

            string comparisonData = JsonConvert.SerializeObject(comparisonList);
            return comparisonData;

        }

        /// <summary>
        /// Transform comparison object to structure understood by Angular control
        /// </summary>
        public void SetComparisonData()
        {
            if (this._comparison != null)
            {
                comparisonList.Clear();
                foreach (ComparisonObject comparisonObject in this._comparison.ComparisonObjects)
                {
                    this.PopulateComparisonData(comparisonObject, 0, null);
                }
            }
        }

        /// <summary>
        /// Helper method to transform comparison object to structure understood by Angular control
        /// </summary>
        /// <param name="comparisonObject">Individual node in the tree</param>
        /// <param name="level">Level in the heirarchy to which the object belongs</param>
        /// <param name="parentNode">Reference to the parent node of the current object</param>
        private void PopulateComparisonData(ComparisonObject comparisonObject, int level, ComparisonTree parentNode)
        {
            if (comparisonObject != null)
            {

                ComparisonTree currentNode = new ComparisonTree
                {
                    NodeType = string.Equals(ComparisonObjectType.DataSource, comparisonObject.ComparisonObjectType) ? "Data Source" : comparisonObject.ComparisonObjectType.ToString(),

                    SourceName = comparisonObject.SourceObjectName,
                    TargetName = comparisonObject.TargetObjectName,
                    SourceInternalName = comparisonObject.SourceObjectInternalName,
                    TargetInternalName = comparisonObject.TargetObjectInternalName,
                    SourceObjectDefinition = comparisonObject.SourceObjectDefinition,
                    TargetObjectDefinition = comparisonObject.TargetObjectDefinition,
                    ShowNode = true,
                    Level = level,
                    MergeAction = comparisonObject.MergeAction.ToString()
                };

                if (parentNode != null)
                {
                    currentNode.ParentId = parentNode.Id;
                    parentNode.ChildNodes.Add(currentNode.Id);
                }

                switch (comparisonObject.Status)
                {
                    case ComparisonObjectStatus.MissingInTarget:
                        currentNode.Status = "Missing in Target";
                        break;
                    case ComparisonObjectStatus.MissingInSource:
                        currentNode.Status = "Missing in Source";
                        break;
                    case ComparisonObjectStatus.SameDefinition:
                        currentNode.Status = "Same Definition";
                        break;
                    case ComparisonObjectStatus.DifferentDefinitions:
                        currentNode.Status = "Different Definitions";
                        break;
                    default:
                        break;
                }

                // set drop-down to have limited members based on what is available
                switch (comparisonObject.MergeAction)
                {
                    case MergeAction.Create:
                        currentNode.AvailableActions = new List<string> { "Create", "Skip" };

                        if (parentNode != null && string.Equals(parentNode.Status, "Missing in Target") && string.Equals(parentNode.MergeAction, "Skip"))
                        {
                            currentNode.AvailableActions = new List<string> { "Skip" };
                        }
                        break;
                    case MergeAction.Update:
                        currentNode.AvailableActions = new List<string> { "Update", "Skip" };
                        break;
                    case MergeAction.Delete:
                        currentNode.AvailableActions = new List<string> { "Delete", "Skip" };

                        //check if parent is also set to delete, in which case make this cell readonly
                        if (parentNode != null && string.Equals(parentNode.MergeAction, "Delete"))
                        {
                            currentNode.AvailableActions = new List<string> { "Delete" };
                        }
                        break;
                    case MergeAction.Skip:

                        switch (comparisonObject.Status)
                        {
                            case ComparisonObjectStatus.MissingInTarget:
                                currentNode.AvailableActions = new List<string> { "Create", "Skip" };

                                //check if parent is also MissingInTarget and Skip, make this cell readonly
                                if (parentNode != null && string.Equals(parentNode.Status, "Missing in Target") && string.Equals(parentNode.MergeAction, "Skip"))
                                {
                                    currentNode.AvailableActions = new List<string> { "Skip" };
                                }

                                break;
                            case ComparisonObjectStatus.MissingInSource:
                                currentNode.AvailableActions = new List<string> { "Delete", "Skip" };
                                break;
                            case ComparisonObjectStatus.DifferentDefinitions:
                                currentNode.AvailableActions = new List<string> { "Update", "Skip" };
                                break;
                            default:
                                //default covers ComparisonObjectStatus.SameDefinition: which is most common case (above cases are for saved skip selections from file)
                                currentNode.AvailableActions = new List<string> { "Skip" };
                                break;
                        }

                        break;
                    default:
                        break;
                };

                comparisonList.Add(currentNode);
                // Add child objects if it exists
                if (comparisonObject.ChildComparisonObjects != null && comparisonObject.ChildComparisonObjects.Count > 0)
                {
                    foreach (ComparisonObject childComparisonObject in comparisonObject.ChildComparisonObjects)
                    {
                        PopulateComparisonData(childComparisonObject, level + 1, currentNode);
                    }
                }
            }
        }

        /// <summary>
        /// Update the object as and when selected action is changed on UI
        /// </summary>
        /// <param name="id">Id of the node updated</param>
        /// <param name="newAction">New selected action</param>
        /// <param name="oldAction">Old selected action</param>
        public void changeOccurred(int id, string newAction, string oldAction)
        {
            foreach (ComparisonTree databaseObject in comparisonList)
            {
                if (databaseObject.Id == id)
                {
                    databaseObject.MergeAction = newAction;
                    break;
                }
            }
        }
    }
}
