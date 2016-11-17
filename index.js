'use strict';

$(function () {

    var grid;

    $('#callback-button').click(function () {
        populateWithData('http://localhost:3000/payments?_sort=amount&_order=DESC&_limit=20');
    });

    $('#promise-button').click(function () {
        populateWithData('http://localhost:3000/payments?merchant=Ginger&_sort=id');
    });

    $('#payment-filter-select').change(function () {
        $.getJSON('http://localhost:3000/payments', function (response) {
            var filterSelection = $('#payment-filter-select').val();
            response = response.filter(function (filter) {
                return filter.method === filterSelection;
            });
            loadDataToGrid(response);
        });
    });

    $('#add-new-payment-form').submit(function (event) {
        $('#created').val(new Date());
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function (response) {
                $('#formResult').html(JSON.stringify(response));
            }
        });
        return false;
    });

    function populateWithData(url) {
        $.getJSON(url, function (response) {
            loadDataToGrid(response);
        });
    }

    function loadDataToGrid(data) {
        if (grid !== undefined)
            grid.destroy();
        grid = $('#grid-data').grid({
            dataSource: data,
            uiLibrary: 'bootstrap',
            columns: [
                { field: 'id', title: 'ID', width: 60 },
                { field: 'method', title: 'Method', width: 100 },
                { field: 'amount', title: 'Amount', width: 100 },
                { field: 'currency', title: 'Currency', width: 80 },
                { field: 'created', title: 'Created'},
                { field: 'status', title: 'Status', width: 100 },
                { field: 'merchant', title: 'Merchant', width: 100 }
            ],
            pager: { limit: 5 }
        });
    }
})