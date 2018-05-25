namespace AlmToolkit
{
    using BismNormalizer.TabularCompare.Core;
    using BismNormalizer.TabularCompare;
    using Model;
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System;

    public class ComparisonJSInteraction
    {
        private Comparison _comparison;

        public static List<ComparisonNode> comparisonList = new List<ComparisonNode>(); // List to be used to populate data in grid control
        private Dictionary<int, AngularComposite> _directAccessList = new Dictionary<int, AngularComposite>(); // Used to maintain a dictionary with direct access to the Angular node and C# comparison object
        private List<ComparisonVisibilityMap> _avMap = new List<ComparisonVisibilityMap>();  // Used to maintain visibility associated with object and mapping between internal name and tree identifier


        #region Public properties
        public Comparison Comparison
        {
            get { return _comparison; }
            set { _comparison = value; }
        }
        #endregion

        #region Angular endpoints

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
        /// Update the object as and when selected action is changed on UI
        /// </summary>
        /// <param name="id">Id of the node updated</param>
        /// <param name="newAction">New selected action</param>
        /// <param name="oldAction">Old selected action</param>
        public void ChangeOccurred(int id, string newAction, string oldAction)
        {
            foreach (ComparisonNode databaseObject in comparisonList)
            {
                if (databaseObject.Id == id)
                {
                    databaseObject.MergeAction = newAction;
                    break;
                }
            }
        }

        #endregion

        #region Data transformation and population

        /// <summary>
        /// Transform comparison object to structure understood by Angular control
        /// </summary>
        public void SetComparisonData()
        {
            if (this._comparison != null)
            {
                comparisonList.Clear();
                _directAccessList.Clear();
                _avMap.Clear();

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
        private void PopulateComparisonData(ComparisonObject comparisonObject, int level, ComparisonNode parentNode)
        {
            if (comparisonObject != null)
            {

                ComparisonNode currentNode = new ComparisonNode
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
                    MergeAction = comparisonObject.MergeAction.ToString(),
                    DisableMessage = "",
                    DropdownDisabled = false
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

                comparisonList.Add(currentNode);

                // Populate helper objects
                AngularComposite angularComposite = new AngularComposite(currentNode, comparisonObject);
                _directAccessList.Add(currentNode.Id, angularComposite);

                ComparisonVisibilityMap visibilityMap = new ComparisonVisibilityMap
                {
                    SourceObjectName = currentNode.SourceName,
                    SourceObjectInternalName = currentNode.SourceInternalName,
                    TargetObjectName = currentNode.TargetName,
                    TargetObjectInternalName = currentNode.TargetInternalName,
                    ObjType = currentNode.NodeType.ToString(),
                    composite = angularComposite,
                    IsVisible = true,
                    ComparisonTreeId = currentNode.Id
                };
                _avMap.Add(visibilityMap);

                // set drop-down to have limited members based on what is available
                switch (comparisonObject.MergeAction)
                {
                    case MergeAction.Create:
                        currentNode.AvailableActions = new List<string> { "Create", "Skip" };

                        if (parentNode != null && string.Equals(parentNode.Status, "Missing in Target") && string.Equals(parentNode.MergeAction, "Skip"))
                        {
                            comparisonObject.MergeAction = MergeAction.Skip;
                            currentNode.MergeAction = MergeAction.Skip.ToString();
                            currentNode.DropdownDisabled = true;
                            SetNodeTooltip(visibilityMap, true);
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
                            currentNode.DropdownDisabled = true;
                            SetNodeTooltip(visibilityMap, true);
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
                                    currentNode.DropdownDisabled = true;
                                    SetNodeTooltip(visibilityMap, true);
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
                                currentNode.DropdownDisabled = true;
                                SetNodeTooltip(visibilityMap, true);
                                break;
                        }

                        break;
                    default:
                        break;
                };

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
        /// Refresh action and visibility for Angular tree objects using Comparison object
        /// </summary>
        public void RefreshComparisonTree()
        {
        }

        #endregion

        #region Helper functions
        /// <summary>
        /// Find a node by its internal name from visibilty map
        /// </summary>
        /// <param name="sourceObjectName">Display name of the node for source</param>
        /// <param name="sourceObjectId">Internal name of the node for source</param>
        /// <param name="targetObjectName">Display name of the node for target</param>
        /// <param name="targetObjectId">Internal name of the node for target</param>
        /// <param name="objType">Object type i.e. Data source, KPI, Measure</param>
        /// <returns>Visibility node with reference to Comparison object as well as Angular node. Null in case not found </returns>
        private ComparisonVisibilityMap FindNodeByInternalName(string sourceObjectName, string sourceObjectId, string targetObjectName, string targetObjectId, ComparisonObjectType objType)
        {
            foreach (ComparisonVisibilityMap node in _avMap)
            {
                // Directly use composite instead
                if (string.Equals(node.composite.dotNetComparison.SourceObjectName, sourceObjectName, StringComparison.InvariantCultureIgnoreCase)
                    && string.Equals(node.composite.dotNetComparison.SourceObjectInternalName, sourceObjectId, StringComparison.InvariantCultureIgnoreCase)
                    && string.Equals(node.composite.dotNetComparison.TargetObjectName, targetObjectName, StringComparison.InvariantCultureIgnoreCase)
                    && string.Equals(node.composite.dotNetComparison.TargetObjectInternalName, targetObjectId, StringComparison.InvariantCultureIgnoreCase)
                    && node.composite.dotNetComparison.ComparisonObjectType == objType)
                {
                    return node;
                }
            }

            return null;
        }

        /// <summary>
        /// Set visibility of Angular node
        /// </summary>
        /// <param name="IsVisible">Show or hide node</param>
        /// <param name="sourceObjectName">Display name of the node for source</param>
        /// <param name="sourceObjectId">Internal name of the node for source</param>
        /// <param name="targetObjectName">Display name of the node for target</param>
        /// <param name="targetObjectId">Internal name of the node for target</param>
        /// <param name="objType">Object type i.e. Data source, KPI, Measure</param>
        private void SetNodeVisibility(bool IsVisible, string sourceObjectName, string sourceObjectId, string targetObjectName, string targetObjectId, ComparisonObjectType objType)
        {
            ComparisonVisibilityMap node = FindNodeByInternalName(sourceObjectName, sourceObjectId, targetObjectName, targetObjectId, objType);
            if (node != null)
            {
                //node.IsVisible = IsVisible;
                node.composite.ngComparison.ShowNode = IsVisible;
            }
        }
        #endregion

        #region Menu actions

        /// <summary>
        /// Show or Hide skip nodes
        /// </summary>
        /// <param name="hide">Hide Skip nodes</param>
        /// <param name="sameDefinitionFilter">Hide objects only in case of same definition</param>
        public void ShowHideSkipNodes(bool hide, bool sameDefinitionFilter = false)
        {
            if (this._comparison != null)
            {
                ShowHideSkipNodes(this._comparison.ComparisonObjects, hide, sameDefinitionFilter);
            }
        }

        /// <summary>
        /// Show or hide skip nodes
        /// </summary>
        /// <param name="comparisonObject">List of comparison objects for whom children are to be checked</param>
        /// <param name="hide">Show or hide the node</param>
        /// <param name="sameDefinitionFilter">Hide nodes with same definition</param>
        private void ShowHideSkipNodes(List<ComparisonObject> comparisonObject, bool hide, bool sameDefinitionFilter)
        {

            foreach (ComparisonObject node in comparisonObject)
            {
                bool isVisible = true;
                if (node.MergeAction.ToString() == "Skip" && (!sameDefinitionFilter || (sameDefinitionFilter && hide && node.Status == ComparisonObjectStatus.SameDefinition)))
                {
                    // if currently selected skip item contains Update, Delete or Create children, then need to keep visible - or result in orphans
                    bool foundCreateOrDeleteChild = false;
                    foreach (ComparisonObject childNode in node.ChildComparisonObjects)
                    {
                        if (childNode.MergeAction == MergeAction.Update || childNode.MergeAction == MergeAction.Delete || childNode.MergeAction == MergeAction.Create)
                        {
                            foundCreateOrDeleteChild = true;
                            break;
                        }
                    }

                    if (hide)
                    {
                        if (!foundCreateOrDeleteChild)
                        {
                            isVisible = false;
                        }
                    }
                    else
                    {
                        isVisible = true;
                    }
                }
                else
                {
                    isVisible = (
                        !(node.MergeAction.ToString() == "Skip " &&
                         (node.ChildComparisonObjects.Count == 0 || !NodeContainsEditableChildren(node, hide))));
                }

                SetNodeVisibility(isVisible, node.SourceObjectName, node.SourceObjectInternalName, node.TargetObjectName, node.TargetObjectInternalName, node.ComparisonObjectType);

                ShowHideSkipNodes(node.ChildComparisonObjects, hide, sameDefinitionFilter);
            }
        }

        /// <summary>
        /// Check if node contains editable children
        /// </summary>
        /// <param name="node">Node for which children is to be checked</param>
        /// <param name="hide">Hide or show</param>
        /// <returns></returns>
        private bool NodeContainsEditableChildren(ComparisonObject node, bool hide)
        {
            bool containsChildren = false;

            foreach (ComparisonObject childNode in node.ChildComparisonObjects)
            {
                if ((hide &&
                     childNode.MergeAction.ToString() != "Skip " &&
                     childNode.MergeAction.ToString() != "Skip") ||
                    (!hide &&
                     childNode.MergeAction.ToString() != "Skip "))
                {
                    containsChildren = true;
                }
                else
                {
                    bool childContainsChildren = NodeContainsEditableChildren(childNode, hide);
                    if (!containsChildren)
                    {
                        containsChildren = childContainsChildren;
                    }
                }

                if (childNode.MergeAction.ToString() == "Skip")
                {
                    SetNodeVisibility(!hide, childNode.SourceObjectName, childNode.SourceObjectInternalName, childNode.TargetObjectName, childNode.TargetObjectInternalName, childNode.ComparisonObjectType);
                }
            }

            if (node.MergeAction.ToString() != "Skip")
            {
                SetNodeVisibility(containsChildren, node.SourceObjectName, node.SourceObjectInternalName, node.TargetObjectName, node.TargetObjectInternalName, node.ComparisonObjectType);
            }

            return containsChildren;
        }

        /// <summary>
        /// Set actions for node with different definitions to update
        /// </summary>
        /// <param name="selectedOnly">Set for selected nodes or all nodes</param>
        public void UpdateItems(bool selectedOnly)
        {
            // If selected only, pick items from selected list

            // Not necessary to run twice with internal method because Updates don't impact children
            foreach (ComparisonNode item in comparisonList)
            {
                if (item.AvailableActions.Contains("Update"))
                {
                    item.MergeAction = "Update";
                    // Set merge action in corresponding comparison list
                    _directAccessList[item.Id].dotNetComparison.MergeAction = MergeAction.Update;
                }
            }
        }


        /********** Set node to skip for depending on comparison object status ****************/
        /// <summary>
        /// Sets Action property of objects to Skip within given range.
        /// </summary>
        /// <param name="selectedOnly"></param>
        /// <param name="comparisonStatus"></param>
        public void SkipItems(bool selectedOnly, ComparisonObjectStatus comparisonObjectStatus = ComparisonObjectStatus.Na) //Na because won't take null cos it's an enum
        {
            //Int32 selectedRowCount = (selectedOnly ? this.Rows.GetRowCount(DataGridViewElementStates.Selected) : this.Rows.Count);
            //if (selectedRowCount > 0)
            //{
            // fudge to ensure child objects Missing in Source are skipped (this is because we have to iterate DataGridViewRow object which isn't hierarchical)
            SkipItemsPrivate(selectedOnly, comparisonObjectStatus);
            SkipItemsPrivate(selectedOnly, comparisonObjectStatus);
            SkipItemsPrivate(selectedOnly, comparisonObjectStatus);

            // Need to check if this is still needed
            //SkipItemsPrivate(selectedOnly, comparisonObjectStatus, selectedRowCount);
            //SkipItemsPrivate(selectedOnly, comparisonObjectStatus, selectedRowCount);

            //    _cellEditCallBack.Invoke();
            //}
        }

        private void SkipItemsPrivate(bool selectedOnly, ComparisonObjectStatus comparisonObjectStatus)
        {
            //for (int i = 0; i < selectedRowCount; i++)
            //{
            //    DataGridViewRow row = (selectedOnly ? this.SelectedRows[i] : this.Rows[i]);

            //    SkipItemPrivate(comparisonObjectStatus, row);
            //}

            foreach (ComparisonObject node in this._comparison.ComparisonObjects)
            {
                // In case of selected only, check if item is present in selected objects
                SkipItemPrivate(comparisonObjectStatus, node);
            }
        }

        private void SkipItemPrivate(ComparisonObjectStatus comparisonObjectStatus, ComparisonObject row)
        {
            if (comparisonObjectStatus == ComparisonObjectStatus.Na ||
                (comparisonObjectStatus == ComparisonObjectStatus.DifferentDefinitions && row.Status == ComparisonObjectStatus.DifferentDefinitions) ||
                (comparisonObjectStatus == ComparisonObjectStatus.MissingInSource && row.Status == ComparisonObjectStatus.MissingInSource) ||
                (comparisonObjectStatus == ComparisonObjectStatus.MissingInTarget && row.Status == ComparisonObjectStatus.MissingInTarget))
            {
                ComparisonVisibilityMap node = FindNodeByInternalName(row.SourceObjectName, row.SourceObjectInternalName, row.TargetObjectName, row.TargetObjectInternalName, row.ComparisonObjectType);
                bool isReadOnly = node != null && node.composite.ngComparison.DropdownDisabled;
                if (!isReadOnly &&
                    row.MergeAction != MergeAction.Skip
                    //&&
                    //row.Cells[8].Value.ToString() != "Set Parent Node" -- Need to check where is this value set
                    )
                {
                    row.MergeAction = MergeAction.Skip;
                    node.composite.ngComparison.MergeAction = MergeAction.Skip.ToString();
                    CheckToSkipChildren(row);
                }
            }
        }

        private void CheckToSkipChildren(ComparisonObject selectedRow)
        {
            // if Missing in Target (default is create) and user selects skip, definitely can't create child objects, so set them to skip too and disable them
            if (selectedRow.Status == ComparisonObjectStatus.MissingInTarget)
            {
                //TreeGridNode selectedNode = FindNodeByIDs(selectedRow.Cells[0].Value.ToString(), selectedRow.Cells[2].Value.ToString(), selectedRow.Cells[6].Value.ToString());

                //if (selectedNode != null)
                //{
                foreach (ComparisonObject node in selectedRow.ChildComparisonObjects)
                {

                    SetNodeToSkip(node);
                }
                //}
            }
            // if Missing in Source (default is delete) and user selects skip, he may still want to delete some child objects, so ensure they are enabled
            else if (selectedRow.Status == ComparisonObjectStatus.MissingInTarget)
            {
                //TreeGridNode selectedNode = FindNodeByIDs(selectedRow.Cells[0].Value.ToString(), selectedRow.Cells[2].Value.ToString(), selectedRow.Cells[6].Value.ToString());

                //if (selectedNode != null)
                //{
                foreach (ComparisonObject node in selectedRow.ChildComparisonObjects)
                {
                    ComparisonVisibilityMap nodeReference = FindNodeByInternalName(node.SourceObjectName
                        , node.SourceObjectInternalName, node.TargetObjectName, node.TargetObjectInternalName, node.ComparisonObjectType);
                    if (nodeReference.composite.ngComparison.AvailableActions.Contains("Skip"))
                    {
                        nodeReference.composite.ngComparison.DropdownDisabled = false;

                        SetNodeTooltip(nodeReference, false);
                    }
                }
                //}
            }
        }
        private void SetNodeToSkip(ComparisonObject node)
        {
            ComparisonVisibilityMap nodeReference = FindNodeByInternalName(node.SourceObjectName
                        , node.SourceObjectInternalName, node.TargetObjectName, node.TargetObjectInternalName, node.ComparisonObjectType);
            if (nodeReference.composite.ngComparison.AvailableActions.Contains("Skip"))
            {
                nodeReference.composite.ngComparison.MergeAction = MergeAction.Skip.ToString();
                nodeReference.composite.dotNetComparison.MergeAction = MergeAction.Skip;
                nodeReference.composite.ngComparison.DropdownDisabled = true;

                SetNodeTooltip(nodeReference, true);
            }
            foreach (ComparisonObject childNode in node.ChildComparisonObjects)
            {
                SetNodeToSkip(childNode);
            }
        }
        private void SetNodeTooltip(ComparisonVisibilityMap node, bool disabledDueToParent)
        {
            //foreach (DataGridViewCell cell in node.Cells)
            //{
            //    cell.ToolTipText = (disabledDueToParent ? "This object's action option is disabled due to a parent object selection" : "");
            //}

            node.composite.ngComparison.DisableMessage = (disabledDueToParent ? "This object's action option is disabled due to a parent object selection" : "");

        }

        /************* End section ****************/
        #endregion
    }
}
