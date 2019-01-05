let metric = true;

class UI {

    static clearField() {
        document.querySelector('#heightText').value = "";
        document.querySelector('#weightText').value = "";
    }

    static changeMetric() {

        if (document.getElementById('inlineRadio1').checked)
            metric = true;
        else
            metric = false;

        console.log("metric: " + metric);

        UI.changeFieldsTo();
    }

    static changeFieldsTo() {

        let height = "";
        let weight = "";
        let heightText = "";
        let weightText = "";

        if (metric) {
            height = "Height in Centimeter";
            weight = "Weight in Kilogram";
            weightText = "85";
            heightText = "185";
        } else {
            height = "Height in inch";
            weight = "Weight in lbs";
            weightText = "220";
            heightText = "71";
        }

        document.querySelector('#heightTextLabel').innerHTML = height;
        document.querySelector('#weightTextLabel').innerHTML = weight;

        document.getElementById("weightText").placeholder = weightText;
        document.getElementById("heightText").placeholder = heightText;
    }

    static calcBMI() {
        // Metric BMI Formula
        // BMI = weight (kg) ÷ height2 (m2)

        // Imperial BMI Formula
        // BMI = weight (lb) ÷ height2 (in2) × 703

        let height = document.querySelector('#heightText').value;
        let weight = document.querySelector('#weightText').value;
        let result;

        if (metric) {
            height = height / 100;
            result = weight / (height * height);
        } else {
            height = weight / (height * height);
            result = height * 703;
        }
        result = Math.round(result * 100) / 100;

        return result;
    }

    static calcAlertStatus(result) {
        var alertStatus = "";

        switch (true) {
            case (result > 30):
                alertStatus = "danger";
                break;
            case (result > 25):
                alertStatus = "warning";
                break;
            case (result < 25):
                alertStatus = "success";
                break;
        }

        return alertStatus;
    }

    static createResultAlert(result, alertStatus) {
        const tempCon = document.querySelector('#resultcontainer');

        const tempResult = document.querySelector('#resultAlert');
        if (tempResult != null) {
            tempResult.remove();
        }

        let resNew = document.createElement('div');
        resNew.innerHTML = `
        <div class="alert alert-${alertStatus}" id="resultAlert" style="width: 30rem;">
         Your BMI is <strong>${result}</strong> !`;

        tempCon.appendChild(resNew);

        setTimeout((e) => {
            const tempResult = document.querySelector('#resultAlert');
            if (tempResult != null) {
                tempResult.remove();
            }
        }, 4000)
    }
}


document.getElementById("inlineRadio1").addEventListener("click", (e) => {
    UI.changeMetric();
});

document.getElementById("inlineRadio2").addEventListener("click", (e) => {
    UI.changeMetric()
});

document.getElementById("resultButton").addEventListener("click", (e) => {
    // prevent actual submit
    e.preventDefault();

    let result = UI.calcBMI();
    let alertStatus = UI.calcAlertStatus(result);

    UI.createResultAlert(result, alertStatus);


    UI.clearField();


});