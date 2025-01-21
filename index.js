module.exports = async function (context, req) {
    const cpf = req.query.cpf || (req.body && req.body.cpf);

    if (!cpf || !isValidCpf(cpf)) {
        context.res = {
            status: 400,
            body: "CPF inválido"
        };
        return;
    }

    context.res = {
        status: 200,
        body: "CPF válido"
    };
};

function isValidCpf(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove não dígitos
    if (cpf.length !== 11) return false;

    let sum = 0;
    let rest;

    // Cálculo do primeiro dígito
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    // Cálculo do segundo dígito
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(10))) return false;

    return true;
}
