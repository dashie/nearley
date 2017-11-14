/**
 * 
 */
const
    N = parseInt(process.argv[2] || 100000, 10),
    TYPES = ['login', 'logout', 'view', 'like', 'add_to_cart', 'buy'],
    NAMES = ['Sherita Conatser', 'Tiffany Menzie', 'Deneen Rosch', 'Priscilla Coello', 'Fernande Restivo', 'David Olah', 'Ben Egger', 'Trena Plotner', 'Lorretta Vassel', 'Rickey Towery', 'Terry Marten', 'Loria Couts', 'Syble Chaisson', 'Marilou Bellin', 'Almeta Tyra', 'Narcisa Shadley', 'Lazaro Woosley', 'Deja Mclester', 'Elna Devaul', 'Chin Millen'];

/**
 * 
 */
function randomInt(n) {
    return parseInt(Math.random() * n, 10);
}

function randomNewLine() {
    if (randomInt(2)) {
        process.stdout.write('\n');
    }
}

function randomSpace() {
    if (N < 10) {
        process.stdout.write(' '.repeat(randomInt(3)));
    }
}

/**
 * 
 */

var i;

randomSpace();
for (i = 0; i < N; ++i) {

    randomSpace();
    process.stdout.write('{');

    process.stdout.write('"id":');
    randomSpace();
    process.stdout.write(i.toString());
    process.stdout.write(',');
    randomNewLine();
    randomSpace();

    process.stdout.write('"ts":');
    randomSpace();
    process.stdout.write((new Date()).getTime().toString());
    process.stdout.write(',');
    randomNewLine();
    randomSpace();

    process.stdout.write('"type":');
    randomSpace();
    process.stdout.write('"');
    process.stdout.write(TYPES[randomInt(TYPES.length)]);
    process.stdout.write('",');
    randomNewLine();
    randomSpace();

    process.stdout.write('"user":');
    randomSpace();
    process.stdout.write('"');
    process.stdout.write(NAMES[randomInt(NAMES.length)]);
    process.stdout.write('"');
    randomNewLine();
    randomSpace();

    process.stdout.write('}');
    if (i < (N - 1)) {
        process.stdout.write(',');
        randomSpace();
        randomNewLine();
    }
}
randomSpace();