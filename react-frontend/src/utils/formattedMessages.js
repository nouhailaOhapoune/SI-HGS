const scopes = Object.freeze(['sideMenu']);

export const formattedMessages = Object.freeze({
  error: 'error',
  success: 'success',
  continue: 'continue',
  yes: 'yes',
  no: 'no',
  updating: 'updating',
  sending: 'sending',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  deleting: 'deleting',
  retry: 'retry',
  save: 'save',
  cancel: 'cancel',
  search: 'search',
  title: 'title',
  selectFromTheList: 'selectFromTheList',
  footer: 'footer',
  next: 'next',
  label_Profile: 'label_Profile',
  profilePreferences: 'profilePreferences',
  logOut: 'logOut',
  // sideMenu
  menuEmployees: `${scopes[0]}.employees`,
  menuInterns: `${scopes[0]}.interns`,
  menuAbsences: `${scopes[0]}.absences`,
  menuLoanManagement: `${scopes[0]}.loanManagement`,
  menuDocuments: `${scopes[0]}.documents`,
});