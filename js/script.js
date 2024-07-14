document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('chessboard');
    const placeLandmineButton = document.getElementById('place-landmine');
    const game = new Chess();
    let board;
    let landmine = null;

    const onDrop = (source, target) => {
        const move = game.move({ from: source, to: target, promotion: 'q' });

        if (move === null) return 'snapback';

        if (landmine && target === landmine) {
            alert('Landmine triggered!');
            // Handle explosion logic here (e.g., remove piece)
            game.remove(target);
            landmine = null; // Clear the landmine after explosion
        }

        updateBoard();
    };

    const updateBoard = () => {
        board.position(game.fen());
    };

    placeLandmineButton.addEventListener('click', () => {
        const square = prompt('Enter the square to place the landmine (e.g., e4):');
        if (game.square_color(square)) {
            landmine = square;
            alert(`Landmine placed at ${square}`);
        } else {
            alert('Invalid square. Try again.');
        }
    });

    board = Chessboard(boardElement, {
        draggable: true,
        dropOffBoard: 'snapback',
        position: 'start',
        onDrop: onDrop,
    });
});
