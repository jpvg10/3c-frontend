const btnInfo = document.getElementById('btn-info');
let visible = false;
const node = document.createElement('div');

let data = {
    rank: '28',
    spec_co: '1060',
    region_suggestion: [
        {
            provider: 'GCP',
            name: 'aws-eu-north-1',
            price_diff: '1',
            spec_co: '800',
        },
        {
            provider: 'GCP',
            name: 'aws-eu-north-1',
            price_diff: '1',
            spec_co: '200',
        }
    ],
    // provider: 'GCP',
    // name: 'aws-eu-north-1',
};

let createTemplate = (index) => {
    const { provider, name, price_diff, spec_co } = data.region_suggestion[index];
    const percentage = (1 - (spec_co / data.spec_co)) * 100;

    return `
        <div class="row">
            <div class="col-xs-1">
                ${index + 1}.
            </div>
            <div class="col-xs-4">
                <p>${provider}</p>
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
                <p>Your spec: ${data.spec_co} Kg CO<sub>2</sub>eq / month</p>
                <p>🚗 This is equivalent to driving ${cars} Km</p>
            </div>
            <div class="row checkboxes">
                <div class="col-xs-3">Better options:</div>
                <div class="col-xs-3">
                    <input type="checkbox"> Only Europe
                </div>
                <div class="col-xs-3">
                    <input type="checkbox"> Only Azure
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
