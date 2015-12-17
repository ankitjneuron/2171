        
var DateHelper = {
    getDate: function(date, format) {
        var format = format || 'YYYY-MM-DD hh:mm a';
        var date = date || new Date();
        return new Date(date);
    },
    compare: function(from_date, end_date){
        var from = new Date(from_date);
        var to = new Date(end_date);
        return (from < to);
    },
    ISODateString: function(d,from,to) {
        if(from){
            d.setHours(00);
            d.setMinutes(00);
            d.setSeconds(00);
        }
        if(to){
            d.setHours(23);
            d.setMinutes(59);
            d.setSeconds(00);
        }
        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        return d.getFullYear() + '-'
                + pad(d.getMonth() + 1) + '-'
                + pad(d.getDate()) + 'T'
                + pad(d.getHours()) + ':'
                + pad(d.getMinutes()) + ':'
                + pad(d.getSeconds()) + 'Z'
    },
     ConvertISODateString: function(d) {
        
        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        return d.getFullYear() + '-'
                + pad(d.getMonth()+1) + '-'
                + pad(d.getDate()) + 'T'
                + pad(d.getHours()) + ':'
                + pad(d.getMinutes()) + ':'
                + pad(d.getSeconds()) + '.000Z'
    }
}
//console.log(new Date(DateHelper.getDate('2015-03-18 10:00 aM')));
//console.log(moment('2015-03-18 10:00 AM').format('YYYY-mm-DD hh:mm a'));
module.exports = DateHelper;