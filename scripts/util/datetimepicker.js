$(function () {
    $('#datetimepickerFirstDate').datetimepicker();
    $('#datetimepickerLastDate').datetimepicker({
        useCurrent: false
    });
    $("#datetimepickerFirstDate").on("dp.change", function (e) {
        $('#datetimepickerLastDate').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepickerLastDate").on("dp.change", function (e) {
        $('#datetimepickerFirstDate').data("DateTimePicker").maxDate(e.date);
    });
});