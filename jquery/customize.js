$(document).ready(function () {

    $.ajax(
        {
            url: "ctrl/customizectrl.php",
            type: 'GET',
            success: function (result) {
                console.log(result.trim());

                var arr = result.trim().split('}{');
                console.log(arr);

                for (var ind = 1; ind < arr.length; ind++) {
                    arr[ind] = '{' + arr[ind];
                    arr[ind - 1] = arr[ind - 1] + '}';
                }

                var str = '[' + arr.join(',') + ']';

                var data = JSON.parse(str);
                console.log(data);

                data.forEach(element => {

                    if (element.type == 'carb') {
                        $('#exampleFormControlSelect1').append('<option value="' + element.amount + '" data-id="'+element.product_productId+'">' + element.name + '</option>')
                    } else if (element.type == 'vege') {
                        $('#vege').append(
                            "<div class='col-sm-6'><div class='form-check form-pad'> " +
                            "<input type='checkbox' class='form-check-input veg' id='vagetable' value='" + element.amount + "' > " +
                            "<label class='form-check-label pad-checkbox' >" + element.name + "</label></div></div>"
                        );}
                        else if (element.type == 'meat') {
                            $('#meat').append(
                                "<div class='col-sm-6'><div class='form-check form-pad'> " +
                                "<input type='checkbox' class='form-check-input meat' id='meat' value='" + element.amount + "' > " +
                                "<label class='form-check-label pad-checkbox' >" + element.name + "</label></div></div>"
                            );
                    }
                });

            }
        }
    );

    // Calculate total
    var total = 0;
    var totalCarb = 0;

    $('#exampleFormControlSelect1').on('change', function () {
        total = parseFloat($('#total').val() ? $('#total').val() : 0);
        total -= totalCarb;
        totalCarb = parseFloat(this.value);
        total += totalCarb;
        $('#total').val(parseFloat(total).toFixed(2));
    });

    $('#vege').on('change', '#vagetable', function () {
        var vegAmount = this.value;
        total = parseFloat($('#total').val() ? $('#total').val() : 0);
        if (this.checked) {
            total += parseFloat(vegAmount);
        } else {
            total -= parseFloat(vegAmount);
        }
        $('#total').val(parseFloat(total).toFixed(2));

    });

    $('#meat').on('change', '#meat', function () {
        var meatAmount = this.value;
        total = parseFloat($('#total').val() ? $('#total').val() : 0);
        if (this.checked) {
            total += parseFloat(meatAmount);
        } else {
            total -= parseFloat(meatAmount);
        }
        $('#total').val(parseFloat(total).toFixed(2));

    });

    $('select#exampleFormControlSelect1').change(function() {
        var id = $('select#exampleFormControlSelect1').find(':selected').data('id');
        $('#selectedCarb').val(id);
    });
});
