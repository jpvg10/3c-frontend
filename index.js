const btnInfo = document.getElementById('btn-info');
let visible = false;
const node = document.createElement('div');

let data = {
    "rank": 5,
    spec_co: 330.34001126578397,
    "selected_region": {
        "provider": "google",
        "name": "google-us-west1",
        "continent": "america",
        "spec_co": 11.083000000000001e-05,
        "price_diff": 0
    },
    "region_suggestion": [
        {
            "provider": "google",
            "name": "google-europe-west6",
            "continent": "europe",
            "spec_co": 5.19e-05,
            "price_diff": 3999
        },
        {
            "provider": "aws",
            "name": "aws-eu-west-3",
            "continent": "europe",
            "spec_co": 6.9019999999999994e-05,
            "price_diff": 619
        },
        {
            "provider": "aws",
            "name": "aws-sa-east-1",
            "continent": "america",
            "spec_co": 8.399e-05,
            "price_diff": 11355
        },
        {
            "provider": "aws",
            "name": "aws-eu-north-1",
            "continent": "europe",
            "spec_co": 9.080000000000001e-05,
            "price_diff": 619
        }
    ]
}

let createTemplate = (index) => {
    const { provider, name, price_diff, spec_co } = data.region_suggestion[index];
    const percentage = (1 - (spec_co / data.selected_region.spec_co)) * 100;

    return `
        <div class="row">
            <div class="col-xs-1">
                ${index + 1}.
            </div>
            <div class="col-xs-4">
                <p class="text-capitalize">${provider}</p>
                <p>Region: ${name}</p>
            </div>
            <div class="col-xs-5">
                <p>${Math.trunc(percentage)}% less CO<sub>2</sub>eq emissions</p>
                <p>$${price_diff} more per month</p>
            </div>
            <div class="col-xs-2">
                <button class="btn btn-default">Select</button>
            </div>
        </div>
    `;
};

let optionElements = '';
data.region_suggestion.forEach((_option, index) => {
    optionElements += createTemplate(index);
});

let cars = Math.trunc(4044 * data.spec_co / 1000);

node.innerHTML = `
    <div id="es-to-os-service-create-popover" role="tooltip" class="fade in popover bottom typography-body-default">
        <h3 class="popover-title">Carbon Footprint</h3>
        <div class="popover-content">
            <div id="spec-label">
                <p>Your spec: ${Math.trunc(data.spec_co)} Kg CO<sub>2</sub>eq / month</p>
                <p>🚗 This is equivalent to driving ${cars} Km</p>
            </div>
            <div class="row checkboxes">
                <div class="col-xs-3">Better options:</div>
                <div class="col-xs-3">
                    <input type="checkbox" id="check-continent">
                    <span class="text-capitalize">Only ${data.selected_region.continent}</span>
                </div>
                <div class="col-xs-3">
                    <input type="checkbox" id="check-provider">
                    <span class="text-capitalize">Only ${data.selected_region.provider}</span>
                </div>
            </div>
            <hr>
            ${optionElements}
        </div>
    </div>
`;

btnInfo.addEventListener('click', () => {
    visible = !visible;
    if (visible) {
        document.body.appendChild(node);
    } else {
        document.body.removeChild(node);
    }
});
