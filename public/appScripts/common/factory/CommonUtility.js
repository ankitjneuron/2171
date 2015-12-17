angular.module('bayaApp').factory('CommonUtility', function () {
    return {
       
        getBusinessHours: function () {
            return [
                {id: "12:00", label: "12:00"},
                {id: "01:00", label: "01:00"},
                {id: "02:00", label: "02:00"},
                {id: "03:00", label: "03:00"},
                {id: "04:00", label: "04:00"},
                {id: "05:00", label: "05:00"},
                {id: "06:00", label: "06:00"},
                {id: "07:00", label: "07:00"},
                {id: "08:00", label: "08:00"},
                {id: "09:00", label: "09:00"},
                {id: "10:00", label: "10:00"},
                {id: "11:00", label: "11:00"},
            ];
        },
         getReportStatus: function () {
            return [
                {id: "pending", label: "Pending"},
                {id: "accepted", label: "Accepted"},
                {id: "rejected", label: "Rejected"},
                {id: "visited", label: "Visited"},
                {id: "missed", label: "Missed"},
                {id: "cancelled", label: "Cancelled"}
                
            ];
        },
        
    };
});
  