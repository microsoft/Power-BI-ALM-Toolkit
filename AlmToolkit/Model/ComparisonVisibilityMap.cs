namespace AlmToolkit.Model
{
    class ComparisonVisibilityMap
    {
        private string _sourceObjectInternalName;
        private string _targetObjectInternalName;
        private string _sourceObjectName;
        private string _targetObjectName;
        private int _comparisonTreeId;

        private bool _isVisible;
        private string _objType;


        #region Public properties
        public AngularComposite composite;

        public string SourceObjectInternalName
        {
            get { return _sourceObjectInternalName; }
            set { _sourceObjectInternalName = value; }
        }
        public string TargetObjectInternalName
        {
            get { return _targetObjectInternalName; }
            set { _targetObjectInternalName = value; }
        }

        public string SourceObjectName
        {
            get { return _sourceObjectName; }
            set { _sourceObjectName = value; }
        }
        public string TargetObjectName
        {
            get { return _targetObjectName; }
            set { _targetObjectName = value; }
        }
        public int ComparisonTreeId
        {
            get { return _comparisonTreeId; }
            set { _comparisonTreeId = value; }
        }

        public bool IsVisible
        {
            get { return _isVisible; }
            set { _isVisible = value; }
        }

        public string ObjType
        {
            get { return _objType; }
            set { _objType = value; }
        }
        #endregion

    }
}
