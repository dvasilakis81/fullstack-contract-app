var rawtabledata = require('../WORD/rawXml/tableData');
var transmissionSubject = require('../WORD/rawXml/transmissionSubject');
var transmissionAttachments = require('../WORD/rawXml/trasmissionAttachments');
var transmissionCC = require('../WORD/rawXml/transmissionCC');
var accountAttachments = require('../WORD/rawXml/accountAttachments');
var accountAffirmation = require('../WORD/rawXml/accountAffirmation');

module.exports = {

  setDataForTransmissionDocument: function (body) {
    var ret = '';
    var subjectRawData = transmissionSubject.getSubjectXmlValue(body);
    var attachmentsRawData = transmissionAttachments.getAttachmentsXmlValue(body);
    var ccValuesRawData = transmissionCC.getCCValues(body);
    var AAY = null;
    if (body.AAY) {
      for (let i = 0; i < body.AAY.length; i++) {
        if (body.AAY[i].Type == 1)
          AAY = body.AAY[i]
      }
    }

    if (body) {
      ret = {
        subject: subjectRawData,
        attachments: attachmentsRawData,
        CC: ccValuesRawData,
        dd: body.DocumentDate,
        dir_name: body.Direction[0].Name,
        dir_name_lower: body.Direction[0].NameInLower,
        dep_name: body.Direction[0].Department[0].Name,
        dep_name_lower: body.Direction[0].Department[0].NameInLower,
        dir_addr: (body.Direction[0].Department[0].Address || ''),
        dir_pc: (body.Direction[0].Department[0].PostalCode || ''),
        dir_ct: (body.Direction[0].Department[0].City || ''),
        dir_sv: (body.Direction[0].Department[0].Supervisor[0].Name || ''),
        dir_sv_tn: (body.Direction[0].Department[0].Supervisor[0].Tel || ''),
        dir_sv_em: (body.Direction[0].Department[0].Supervisor[0].Email || ''),
        c_type: body.Contract[0].ContractType,
        c_conc_a: body.Contract[0].Concessionaire[0].Article,
        c_conc: body.Contract[0].Concessionaire[0].Name,
        c_conc_afm: body.Contract[0].Concessionaire[0].Afm,
        c_tar: body.Contract[0].Title[0].Article,
        c_title: body.Contract[0].Title[0].Value,
        c_st: body.Contract[0].Date[0].Start,
        c_et: body.Contract[0].Date[0].End,
        c_pn: body.Contract[0].Protocol[0].Number,
        c_pd: body.Contract[0].Protocol[0].Date,
        c_an: body.Contract[0].Award[0].Number || '',
        c_ad: body.Contract[0].Award[0].Date || '',
        c_aa: body.Contract[0].Award[0].Ada || '',
        kae: body.Contract[0].Kae,
        c_actor: body.Contract[0].Actor,
        c_dir: body.Contract[0].CodeDirection,
        c_cpv_code: body.Contract[0].CPV[0].Code,
        c_cpv_title: body.Contract[0].CPV[0].Title,
        c_bal: body.Contract[0].Balance,
        a_n: body.Account[0].Number,
        a_n_w: body.Account[0].NumberWord,
        a_sd: body.Account[0].Start,
        a_ed: body.Account[0].End,
        a_ta: body.Account[0].Amount,
        a_in: body.Account[0].Invoice[0].ProtocolNumber,
        a_id: body.Account[0].Invoice[0].ProtocolDate,
        a_idd: body.Account[0].Invoice[0].DeliveredDate,
        a_iddpn: body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
        a_iddpd: body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
        aay: AAY && AAY.Value ? AAY.Value : '',
        aay_year: AAY && AAY.Year ? AAY.Year : '',
        aay_pn: AAY && AAY.ProtocolNumber ? AAY.ProtocolNumber : '',
        aay_pdt: AAY && AAY.ProtocolDate ? AAY.ProtocolDate : '',
        aay_ead_n: AAY && AAY.EadNumber ? AAY.EadNumber : '',
        aay_ada: AAY && AAY.ADA ? AAY.ADA : '',
        sign_title: body.Signature && body.Signature.length > 0 && body.Signature[0] ? body.Signature[0].SignatoryTitle : '',
        kaa: (body.Signature && body.Signature.length > 0 && body.Signature[0] && body.Signature[0].Kaa ? body.Signature[0].Kaa : ''),
        sign_name: body.Signature && body.Signature.length > 0 && body.Signature[0] && body.Signature[0].SignatoryName.toLowerCase().includes("κακριδ") ? '' : body.Signature[0].SignatoryName,
        sign_sv: body.Signature && body.Signature.length > 0 && body.Signature[0] && body.Signature[0].SignatoryName.toLowerCase().includes("κακριδ") ? body.Signature[0].SignatoryName : '',
        ft_pn: body.Account[0].FirstAccountProtocol || '',
        t_e_s: body.Contract[0].TitleStartExpense
      }
    }

    return ret;
  },
  setDataForAccountDocument: function (body) {
    var ret = '';

    var attachmentsRawData = accountAttachments.getAttachmentsXmlValue(body);
    var affirmationRawData = accountAffirmation.getText(body);
    var rawTableDataValue = rawtabledata.getRawXmlTableValue(body, true);

    if (body) {

      ret = {
        rawTableData: rawTableDataValue,
        attachments: attachmentsRawData,
        affirmation: affirmationRawData,
        year: body.BudgetExpenditureYear,
        la: body.LawArticle,
        dd: body.DocumentDate,
        dcd: body.WorkConfirmationDate,
        ddg: body.DeliveryGoodsDate,
        dir_name: body.Direction[0].Name,
        dir_name_lower: body.Direction[0].NameInLower,
        dep_name: body.Direction[0].Department[0].Name,
        dep_name_lower: body.Direction[0].Department[0].NameInLower,
        c_ca: body.Contract[0].AmountPure,
        c_fpa: body.Contract[0].AmountFpa,
        c_tam: body.Contract[0].AmountTotal,
        c_pa: body.Contract[0].PaidAmountPureUntilToday,
        c_paf: body.Contract[0].PaidAmountFpaUntilToday,
        c_pat: body.Contract[0].PaidAmountTotalUntilToday,
        c_t: body.Contract[0].ContractTypeValue1,
        c_tn: body.Contract[0].ContractTypeValue2,
        c_conc_a: body.Contract[0].Concessionaire[0].Article,
        c_conc: body.Contract[0].Concessionaire[0].Name,
        c_tar: body.Contract[0].Title[0].Article,
        c_title: body.Contract[0].Title[0].Value,
        c_pn: body.Contract[0].Protocol[0].Number,
        c_pd: body.Contract[0].Protocol[0].Date,
        c_la: body.Contract[0].LawArticle,
        kae: body.Contract[0].Kae,
        ac: body.Contract[0].Actor,
        cd: body.Contract[0].CodeDirection,
        fpa_v: body.Contract[0].FpaValue,
        a_n: body.Account[0].No,
        a_n_w: body.Account[0].numberWord,
        a_ca: body.Account[0].AmountPure,
        a_fpa: body.Account[0].AmountFpa,
        a_ta: body.Account[0].AmountTotal,
        a_word: body.Account[0].AmountInWords,
        a_word_cap: body.Account[0].AmountInWordsCapital,
        a_sd: body.Account[0].Start,
        a_ed: body.Account[0].End,
        a_in: body.Account[0].Invoice[0].ProtocolNumber,
        a_id: body.Account[0].Invoice[0].ProtocolDate,
        aay: body.AAY && body.AAY[0].Value ? body.AAY[0].Value : '',
        aay_year: body.AAY ? body.AAY[0].Year : '',
        aay_pn: body.AAY && body.AAY[0].ProtocolNumber ? body.AAY[0].ProtocolNumber : '',
        aay_pdt: body.AAY && body.AAY[0].ProtocolDate ? body.AAY[0].ProtocolDate : '',
        aay_ead_n: body.AAY && body.AAY[0].EADNumber ? body.AAY[0].EADNumber : '',
        aay_ada: body.AAY && body.AAY[0].ADA ? body.AAY[0].ADA : '',
        a_mra: body.Account[0].MixedRemainApproval,
        kaa: body.Signature[0].Kaa,
        writer_title: body.Signature[0].WriterTitle,
        writer: body.Signature[0].WriterName,
        foremanDepartment_title: body.Signature && body.Signature.length > 0 && body.Signature[0] ? body.Signature[0].ForemanDepartmentTitle : '',
        foremanDepartment: body.Signature && body.Signature.length > 0 && body.Signature[0] ? body.Signature[0].ForemanDepartmentName : '',
        foremanDirection_title: body.Signature && body.Signature.length > 0 && body.Signature[0] ? body.Signature[0].ForemanDirectionTitle : '',
        foremanDirection: body.Signature && body.Signature.length > 0 && body.Signature[0] && body.Signature[0].ForemanDirectionName.toLowerCase().includes("κακριδ") ? '' : body.Signature[0].ForemanDirectionName,
        foremanDirection2: body.Signature && body.Signature.length > 0 && body.Signature[0] && body.Signature[0].ForemanDirectionName.toLowerCase().includes("κακριδ") ? body.Signature[0].ForemanDirectionName : ''
      }
    }

    return ret;
  }
};