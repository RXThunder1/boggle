import random

def generate_board():
    """
    Generate a 4x4 board with random letters.
    """
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return [[random.choice(letters) for _ in range(4)] for _ in range(4)]

def check_valid_word(board, word):
    """
    Check if the word is valid on the board.
    """
    # Implement your word-checking logic here
    # For simplicity, this is a stub. Replace with actual logic.
    return True