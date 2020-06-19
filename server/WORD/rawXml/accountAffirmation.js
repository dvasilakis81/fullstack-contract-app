const helper = require('../../HelperMethods/helpermethods')
const util = require('util');
const common = require('./common');
// import { getWord } from '../../../HelperMethods/helpermethods'

module.exports = {

  //Τεχνοπολις 2)  1)	Την με ΑΠ 162990/11.06.2019 Προγραμματική Σύμβαση και ειδικότερα το άρθρο 9 Πόροι - Εκταμίευση, αυτής
  getText: function (body) {
    var contracTypeLabel = body.Contract[0].ContractTypeId == 1 ? 'Δημόσιας Ανάθεσης Σύμβασης' : 'Προγραμματικής Σύμβασης';
    var contractLawArticle = body.Contract[0].LawArticle;
    var cpn = body.Contract[0].Protocol[0].Number;
    var cpd = body.Contract[0].Protocol[0].Date;
    var aiw = body.Account[0].AmountInWords;
    var am = body.Account[0].AmountTotal;
    var fpa = body.Contract[0].FpaValue;
    var aic = body.Account[0].AmountInWordsCapital;

    if (body.Account[0].MonitoringCommittee) {
      return '<w:p>' +
        '<w:pPr>' +
        '<w:snapToGrid w:val="0"/>' +
        '<w:spacing w:line="360" w:lineRule="auto"/>' +
        '<w:jc w:val="center"/>' +
        '<w:rPr>' +
        '<w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>' +
        '<w:sz w:val="28"/><w:szCs w:val="28"/>' +
        '</w:rPr>' +
        '</w:pPr>' +
        common.getrElement(util.format('Η Επιτροπή Παρακολούθησης, σύμφωνα με το πρακτικό της %s', body.Account[0].No)) +
        '<w:r><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>ης</w:t></w:r>' +
        '<w:r xml:space="preserve">' +        
        '<w:t>' +
        util.format('(%s) Συνεδρίασης, «Πιστοποίησε με ομόφωνη απόφαση την καλή εκτέλεση των ως άνω εργασιών ', helper.getNumberLectical(body.Account[0].No)) +
        '</w:t>' +
        '</w:r>' +
        '<w:r xml:space="preserve"><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>' +
        util.format('και του αντικειμένου της προγραμματικής, βάσει της λεπτομερούς αναφοράς και του έντυπου υλικού που παρουσιάστηκαν ως τεκμήρια και αναφέρονται στο φυσικό αντικείμενο καθώς και στα στοιχεία που αντιστοιχούν στο οικονομικό αντικείμενο και αφού έλαβε υπόψη την απόσβεση του ποσού της προκαταβολής του ύψους %s (πλέον Φ.Π.Α.), εγκρίνει την καταβολή του σχετικού ποσού των %s πλέον του αναλογούντος Φ.Π.Α.»', helper.getNumberLectical(body.Account[0].Accounts[0]), helper.getNumberLectical(body.Account[0].AmountTotal)) +
        '</w:t></w:r>' +
        '</w:p>' +

        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:spacing w:line="360" w:lineRule="auto"/>' + 
        '<w:jc w:val="center"/>' +         
        '</w:pPr>'+
        common.getrElement(util.format('“με την υπογραφή της παρούσας σύμβασης θα καταβληθεί το ποσό των %s (%s) συμπεριλαμβανομένου αναλογούντος ΦΠΑ %s ως προκαταβολή” η δυνατότητα καταβολής του ποσού', aiw, am, fpa)) +
        '</w:p>' +
        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:spacing w:line="360" w:lineRule="auto"/>' + 
        '<w:jc w:val="center"/>' + 
        '<w:rPr>' + 
        '<w:bCs/>' + 
        '<w:lang w:val="en-US"/>' + 
        '</w:rPr>' + 
        '</w:pPr>' +
        common.getrElement(util.format('των %s (%s)”', aic, am)) +
        '</w:p>'
    } else
      return '<w:p>' +
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:spacing w:line="360" w:lineRule="auto"/>' + 
        '<w:ind w:left="-567"/>' + 
        '<w:rPr>' +         
        '<w:b/>' + 
        '<w:bCs/>' + 
        '</w:rPr>' + 
        '</w:pPr>' + 
        '</w:p>' +
        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:spacing w:line="360" w:lineRule="auto"/>' + 
        '<w:ind w:left="-567"/>' + 
        '<w:rPr>' + 
        '<w:b/>' + 
        '<w:bCs/>' + 
        '</w:rPr>' + 
        '</w:pPr>' + 
        '</w:p>' +
        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:jc w:val="center"/>' + 
        '<w:rPr>' +         
        '<w:b/>' +         
        '</w:rPr>' + 
        '</w:pPr>' +
        common.getBoldText('ΒΕΒΑΙΩΝΕΤΑΙ') +
        '</w:p>' +
        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:rPr>' + 
        '<w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>' + 
        '<w:sz w:val="22"/>' + 
        '<w:szCs w:val="22"/>' + 
        '</w:rPr>' + 
        '</w:pPr>' + 
        '</w:p>' +
        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:spacing w:line="360" w:lineRule="auto"/>' + 
        '<w:jc w:val="center"/>' + 
        '<w:rPr>' + 
        '<w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>' +
        '<w:sz w:val="28"/>' + 
        '<w:szCs w:val="28"/>' + 
        '</w:rPr>' + 
        '</w:pPr>' +
        common.getrElement(util.format('βάσει του άρθρου %s της με Α.Π. %s/%s %s', contractLawArticle, cpn, cpd, contracTypeLabel)) + 
        '</w:p>' +
        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:spacing w:line="360" w:lineRule="auto"/>' + 
        '<w:jc w:val="center"/>' + 
        '<w:rPr>' + 
        '<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' + 
        '<w:sz w:val="28"/>' + 
        '<w:szCs w:val="28"/>' + 
        '</w:rPr>' + 
        '</w:pPr>' + 
        common.getrElement(util.format('“με την υπογραφή της παρούσας σύμβασης θα καταβληθεί το ποσό των %s (%s) συμπεριλαμβανομένου αναλογούντος ΦΠΑ %s ως προκαταβολή όπως αυτό προβλέπεται από την κείμενη νομοθεσία” η δυνατότητα καταβολής του ποσού των ', aiw, am, fpa)) +
        '</w:p>' +
        '<w:p>' + 
        '<w:pPr>' + 
        '<w:snapToGrid w:val="0"/>' + 
        '<w:spacing w:line="360" w:lineRule="auto"/>' + 
        '<w:jc w:val="center"/>' +
        '<w:rPr>' +
        '<w:bCs/>' +        
        '<w:lang w:val="en-US"/>' + 
        '</w:rPr>' + 
        '</w:pPr>' +
        common.getBoldText(util.format('%s (%s)”', aic, am)) +
        '</w:p>'
  }
}