$(document).ready(function () {
    var idCounter = 1; // Initialize the counter

    // Event handler for Add Item buttons
    $('.btn-product').on('click', function () {
        // Get product details
        var $item = $(this).closest('.item');
        var id = idCounter++; // Use the current counter value and then increment it
        var name = $item.find('h2').text().trim();
        var price = parseFloat($item.find('.price').text().trim()); // Parse price as float

        // Prompt the user for the quantity
        var qty = prompt("Enter the quantity for item #" + id, "0");
        var discount = prompt("Enter value discount" + id, "0");
        if (qty === null) {
            return; // Exit if the prompt is canceled
        }

        qty = parseInt(qty) || 1; // Parse the quantity as an integer or default to 0

        // Append a new row to the table
        var totaldis=(100-discount)/100
        var total = (price*totaldis) // Calculate total for the given quantity
        var newRow = `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${qty}</td>
                <td>${price}</td>
                <td class="discount">${discount}%</td>
                <td class="total">${total}</td>
            </tr>
        `;
       
        $('.add-tbl').append(newRow);
        updateTotal(); // Update total after adding a new row
    });
    
    // Function to update the total
    function updateTotal() {
        var total = 0;
        var totaldis=0;
        $('.add-tbl .total').each(function () {
            total += parseFloat($(this).text()) || 0; // Accumulate total from each row
        });
        $('.add-tbl .discount').each(function () {
            totaldis += parseFloat($(this).text()) || 0; // Accumulate total from each row
        });
        $('.total-result').text( total.toFixed(2)+"$");
        $('.total-discount').text( totaldis+"$");
        
        
    }

    // Event handler for Pay button
    $('#btn-pay').on('click', function(){
        var payreturn = parseFloat(prompt("Enter the amount paid by the customer:", "0"));
        if (isNaN(payreturn) || payreturn < 0) {
            alert("Invalid input. Please enter a valid positive number.");
            return;
        }

        var total = calculateTotal();
        var returnCash = payreturn - total;

        if (returnCash >= 0) {
            alert("Total: $" + total.toFixed(2) + "\nPaid: $" + payreturn.toFixed(2) + "\nReturn Cash: $" + returnCash.toFixed(2));
            updatereturntotal(returnCash);
            $('.total-pay').text(payreturn.toFixed(2)+"$");
        } else {
            alert("Insufficient payment. Please enter a valid amount.");
        }
    });

    // Function to calculate the total/*
    function calculateTotal() {
        var total = 0;
        $('.add-tbl .total').each(function () {
            total += parseFloat($(this).text()) || 0; // Accumulate total from each row
        });
        return total;
    }
   
    // Function to update the return total
    function updatereturntotal(returnCash) {
        $('.total-return').text(returnCash.toFixed(2)+"$");
    }
    // Event handler for Remove Item button
    $('#remove-item').on('click', function () {
        // Remove the last row from the table
        $('.add-tbl tr:last').remove();
        updateTotal(); // Update total after removing a row
    });

    // Event handler for Clear button
    $('#clear-item').on('click', function () {
        // Clear all rows from the table
        $('.add-tbl').empty();
        updateTotal(); // Update total after clearing the table
        idCounter = 1; // Reset the counter when clearing the table
    });
    $('#print-invoie').on('click', function(){
        printTable('#tbl-report');
    });

    // Function to print the table
    function printTable(selector) {
        var printContents = $(selector).html();
        var originalContents = $('body').html();

        $('body').html(printContents);
        window.print();

        $('body').html(originalContents);
    }
    $('#print-invoice').on('click', function () {
        printTable('#tbl-report');
    });

    // Function to print and save the table
    function printTable(selector) {
        var printContents = $(selector).html();

        // Create a new HTML2PDF instance
        var pdf = new html2pdf(printContents);

        // Save the PDF with a filename 'receipt.pdf'
        pdf.save('receipt.pdf');

        // You can also open the PDF in a new tab using:
        // pdf.outputPdf('datauristring');
    }
});



