getMonitoringCommiteeInfo() {
  var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails
  return <>
    <header style={useStyles.category}>Στοιχεία Επιτροπής Παρακολούθησης</header>
    {this.state.HasMonitoringCommittee === true ?
      <div>
        <div style={useStyles.divRowFlex}>
          {getTextFieldWithTooltip(getMonitoringCommitteeTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, this.state.AccountNumber, 4), 'date', 'MonitoringCommitteeMayorDecisionForMembersProtocolNumber', 'Α.Π. Πρακτικού', 'outlined', this.state.MonitoringCommitteeMayorDecisionForMembersProtocolNumber, true, useStyles.accountInfoItem, false, null, { shrink: true }, this.setTextValue)}
          {getTextFieldWithTooltip(getMonitoringCommitteeTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, this.state.AccountNumber, 4), 'date', 'MonitoringCommitteeMayorDecisionForMembersProtocolDate', 'Α.Π. Πρακτικού', 'outlined', this.state.MonitoringCommitteeMayorDecisionForMembersProtocolDate, true, useStyles.accountInfoItem, false, null, { shrink: true }, this.setTextValue)}						
          {getTextFieldWithTooltip(getMonitoringCommitteePracticalTooltipTemplate(useStyles, this.state, this.state.AccountNumber, 1), 'date', 'MonitoringCommitteePracticalDate', 'Ημερομηνία Πρακτικού', 'outlined', this.state.MonitoringCommitteePracticalDate, true, useStyles.accountInfoItem, false, null, { shrink: true }, this.setTextValue)}
          {getTextFieldWithTooltip(getMonitoringCommitteeTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, this.state.AccountNumber, 1), 'text', 'MonitoringCommitteeDocumentProtocolNumber', 'Α.Π. Διαβιβαστικού Εγγράφου', 'outlined', this.state.MonitoringCommitteeDocumentProtocolNumber, true, useStyles.accountInfoItem, false, null, { shrink: true }, this.setTextValue)}
          {getTextFieldWithTooltip(getMonitoringCommitteeTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, this.state.AccountNumber, 2), 'date', 'MonitoringCommitteeDocumentProtocolDate', 'Α.Π. Διαβιβαστικού Εγγράφου', 'outlined', this.state.MonitoringCommitteeDocumentProtocolDate, true, useStyles.accountInfoItem, false, null, { shrink: true }, this.setTextValue)}
        </div>
      </div> : <></>}
    <div>
      {getButton('contained', 'small', null, useStyles.btnAuto, this.state.HasMonitoringCommittee === true ? this.removeMonitoringCommittee : this.addMonitoringCommittee, this.state.HasMonitoringCommittee === true ? 'Διαγραφή στοιχείων επιτροπής παρακολούθησης' : 'Προσθήκη στοιχείων επιτροπής παρακολούθησης' , null, false)}
    </div>
  </>
}