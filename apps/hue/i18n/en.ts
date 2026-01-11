/**
 * English Translations
 * 영어 번역
 */

export const en = {
  // App
  app: {
    name: "Hue",
    tagline: "Visual UI Editor by HUA Labs",
  },

  // Toolbar
  toolbar: {
    undo: "Undo",
    redo: "Redo",
    save: "Save",
    load: "Load",
    export: "Export",
    import: "Import",
    preview: "Preview",
    edit: "Edit",
    settings: "Settings",
    newProject: "New Project",
    projectName: "Project Name",
  },

  // Panels
  panels: {
    components: "Components",
    properties: "Properties",
    layers: "Layers",
    context: "Context",
    schema: "Schema",
  },

  // Component Categories
  categories: {
    layout: "Layout",
    typography: "Typography",
    form: "Form",
    display: "Display",
    feedback: "Feedback",
    advanced: "Advanced",
  },

  // Properties Panel
  properties: {
    noSelection: "No component selected",
    selectToEdit: "Select a component to edit",
    node: "Node",
    styles: "Styles",
    layout: "Layout",
    content: "Content",
    conditions: "Conditions",
    actions: "Actions",
    addCondition: "Add Condition",
    removeCondition: "Remove Condition",
    conditionField: "Field",
    conditionOperator: "Operator",
    conditionValue: "Value",
  },

  // Condition Operators
  operators: {
    eq: "Equals",
    neq: "Not Equals",
    gt: "Greater Than",
    gte: "Greater Than or Equal",
    lt: "Less Than",
    lte: "Less Than or Equal",
    contains: "Contains",
    notContains: "Does Not Contain",
    exists: "Exists",
    notExists: "Does Not Exist",
  },

  // Canvas
  canvas: {
    dropHere: "Drop Here",
    emptyCanvas: "Drag a component to start",
    mobile: "Mobile",
    tablet: "Tablet",
    desktop: "Desktop",
  },

  // Context Panel
  context: {
    title: "Context",
    presets: "Presets",
    guest: "Guest",
    member: "Member",
    admin: "Admin",
    custom: "Custom",
    addValue: "Add Value",
    key: "Key",
    value: "Value",
  },

  // Export
  export: {
    title: "Export",
    json: "JSON Schema",
    react: "React Code",
    copied: "Copied to clipboard",
    download: "Download",
    copyToClipboard: "Copy to Clipboard",
  },

  // Settings
  settings: {
    title: "Settings",
    language: "Language",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    autoSave: "Auto Save",
    autoSaveInterval: "Auto Save Interval",
    gridSnap: "Grid Snap",
    showGrid: "Show Grid",
    close: "Close",
  },

  // Common
  common: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    duplicate: "Duplicate",
    copy: "Copy",
    paste: "Paste",
    cut: "Cut",
    undo: "Undo",
    redo: "Redo",
    search: "Search",
    searchPlaceholder: "Search...",
    noResults: "No Results",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    ok: "OK",
    close: "Close",
    open: "Open",
    add: "Add",
    remove: "Remove",
    edit: "Edit",
    view: "View",
    reset: "Reset",
    clear: "Clear",
    selectAll: "Select All",
    deselectAll: "Deselect All",
    expandAll: "Expand All",
    collapseAll: "Collapse All",
  },

  // Shortcuts
  shortcuts: {
    title: "Shortcuts",
    undo: "Undo",
    redo: "Redo",
    copy: "Copy",
    paste: "Paste",
    duplicate: "Duplicate",
    delete: "Delete",
    preview: "Preview",
    edit: "Edit Mode",
    toggleLeftPanel: "Toggle Left Panel",
    toggleRightPanel: "Toggle Right Panel",
    toggleContextPanel: "Toggle Context Panel",
  },

  // Project
  project: {
    new: "New Project",
    open: "Open Project",
    save: "Save Project",
    saveAs: "Save As",
    recent: "Recent Projects",
    noRecent: "No recent projects",
    untitled: "Untitled",
    modified: "Modified",
    saved: "Saved",
  },

  // Error Messages
  errors: {
    loadFailed: "Failed to load",
    saveFailed: "Failed to save",
    exportFailed: "Failed to export",
    importFailed: "Failed to import",
    invalidJson: "Invalid JSON",
    unknownError: "Unknown error",
  },

  // Toast Messages
  toast: {
    saved: "Saved",
    copied: "Copied",
    deleted: "Deleted",
    undone: "Undone",
    redone: "Redone",
    exported: "Exported",
    imported: "Imported",
  },
} as const;
