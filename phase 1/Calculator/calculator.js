const result = document.getElementById('result');

function appendToResult(value) {
    result.value += value;
}

function clearResult() {
    result.value = '';
}

function deleteLast() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        result.value = eval(result.value);
    } catch (error) {
        result.value = 'Error';
    }
}