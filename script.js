document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.nav).scrollIntoView({ behavior: 'smooth' });
    });
});

document.getElementById('exploreBtn')?.addEventListener('click', () => {
    document.getElementById('sets').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('restartBtn')?.addEventListener('click', () => {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});

// ========== SET THEORY ==========
let currentSetOperation = 'union';

function parseSetInput(str) { 
    return new Set(
        str.split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(v => Number(v))
    ); 
}

function formatSet(set) {

    const arr = Array.from(set);
    if(arr.length === 0) return '∅ (Empty Set)';

    if(arr.length > 20) {
        return arr.slice(0, 20).join(', ') + 
        ' ... and ' + 
        (arr.length - 20) + ' more';
    }
    return arr.join(', ');
}

function computeSetOperation(){

    const setAValue = document.getElementById('setA').value.trim();
    const setBValue = document.getElementById('setB').value.trim();// Keep result area empty until user enters values
    if(setAValue === '' || setBValue === ''){
        document.getElementById('setResultDisplay').innerHTML = '';
        return;
    }
    const A = parseSetInput(setAValue);
    const B = parseSetInput(setBValue);

    const intersect = new Set([...A].filter(x => B.has(x)));

    let result, opName, icon, description;

    switch(currentSetOperation){

        case 'union':

            result = new Set([...A, ...B]);

            opName = "Union (A ∪ B)";

            

            description = 
            "All elements that are in A, in B, or in both.";

            break;

        case 'intersection':
            result = intersect;
            opName = "Intersection (A ∩ B)";
            

            description = 
            "Elements that are present in both A and B.";

            break;

        case 'aMinusB':

            result = new Set(
                [...A].filter(x => !B.has(x))
            );

            opName = "Difference (A − B)";

        

            description = 
            "Elements that are present in A but NOT in B.";

            break;

        case 'bMinusA':

            result = new Set(
                [...B].filter(x => !A.has(x))
            );

            opName = "Difference (B − A)";

            

            description = 
            "Elements that are present in B but NOT in A.";

            break;

        default:
            return;
    }

    document.getElementById('setResultDisplay').innerHTML = `
        <div class="result-item">

            <div class="result-title">
                 ${opName}
            </div>

            <div class="result-content">
                <strong>Result Set:</strong> 
                { ${formatSet(result)} }
            </div>

            <div class="result-number">
                |set| = ${result.size}
            </div>

            <div class="result-content" style="background: #eef2ff;">
                📊 <strong>Set Details:</strong><br>

                |A| = ${A.size}
                &nbsp;

                |B| = ${B.size}
                &nbsp;

                
            </div>

            <div class="result-badge">
                ${description}
            </div>

        </div>
    `;
}

document.querySelectorAll('.op-btn').forEach(btn => {

    btn.addEventListener('click', () => {

        document.querySelectorAll('.op-btn')
        .forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        currentSetOperation = btn.dataset.op;

        computeSetOperation();
    });

});

// Compute Result Button Working
document.getElementById('applySetOp')
?.addEventListener('click', computeSetOperation);

// ========== ARITHMETIC PROGRESSION ==========
function computeAP(){

    const a1Value = document.getElementById('apA1').value.trim();
    const dValue = document.getElementById('apD').value.trim();
    const nValue = document.getElementById('apN').value.trim();

    // Keep blank until user enters values
    if(a1Value === '' || dValue === '' || nValue === ''){

        document.getElementById('apResult').innerHTML = '';

        return;
    }

    const a1 = parseFloat(a1Value);
    const d = parseFloat(dValue);
    const n = parseInt(nValue);

    if(isNaN(a1) || isNaN(d) || isNaN(n) || n < 1){

        document.getElementById('apResult').innerHTML = `
            <div class="result-item">

                <div class="result-title">
                    ⚠️ Invalid Input
                </div>

                <div class="result-content">
                    Please enter valid numbers for all fields.
                </div>

            </div>
        `;

        return;
    }

    let terms = [];

    for(let i = 0; i < n; i++){

        terms.push(a1 + i * d);
    }

    const lastTerm = a1 + (n - 1) * d;

    const sum = (n / 2) * (a1 + lastTerm);

    let sequenceDisplay = terms
    .map(t => t.toFixed(2))
    .join(' → ');

    if(terms.length > 12){

        sequenceDisplay =

        terms.slice(0, 8)
        .map(t => t.toFixed(2))
        .join(' → ')

        +

        ' ... → '

        +

        terms[terms.length - 1].toFixed(2);
    }

    document.getElementById('apResult').innerHTML = `
        <div class="result-item">

            <div class="result-title">
                📊 Arithmetic Progression Results
            </div>

            <div class="result-content">

                <strong>Given:</strong><br>

                First term a₁ = 
                <span class="highlight-text">${a1}</span><br>

                Common difference d = 
                <span class="highlight-text">${d}</span><br>

                Number of terms n = 
                <span class="highlight-text">${n}</span>

            </div>

            <div class="result-number">
                Last term (aₙ) = ${lastTerm.toFixed(4)}
            </div>

            <div class="result-number">
                Sum (Sₙ) = ${sum.toFixed(4)}
            </div>

            <div class="result-content">

                <strong>📜 Full Sequence:</strong><br>

                <span style="font-size:0.9rem; word-break: break-all;">
                    ${sequenceDisplay}
                </span>

            </div>

            <div class="result-badge">

                Sₙ = n/2 × (a₁ + aₙ)

                = ${n}/2 × (${a1} + ${lastTerm.toFixed(2)})

                = ${sum.toFixed(4)}

            </div>

        </div>
    `;
}

// Compute Result Button Working
document.getElementById('computeApBtn')
?.addEventListener('click', computeAP);

console.log("Maths Simplified App Loaded Successfully!");
console.log("Features: Set Theory, Arithmetic Progression, About Us Section");