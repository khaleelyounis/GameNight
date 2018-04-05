import React, { Component } from 'react';
import twoH from '../assets/images/2H.png';
import twoD from '../assets/images/2D.png';
import twoC from '../assets/images/2C.png';
import twoS from '../assets/images/2S.png';
import threeH from '../assets/images/3H.png';
import threeD from '../assets/images/3D.png';
import threeC from '../assets/images/3C.png';
import threeS from '../assets/images/3S.png';
import fourH from '../assets/images/4H.png';
import fourD from '../assets/images/4D.png';
import fourC from '../assets/images/4C.png';
import fourS from '../assets/images/4S.png';
import fiveH from '../assets/images/5H.png';
import fiveD from '../assets/images/5D.png';
import fiveC from '../assets/images/5C.png';
import fiveS from '../assets/images/5S.png';
import sixH from '../assets/images/6H.png';
import sixD from '../assets/images/6D.png';
import sixC from '../assets/images/6C.png';
import sixS from '../assets/images/6S.png';
import sevenH from '../assets/images/7H.png';
import sevenD from '../assets/images/7D.png';
import sevenC from '../assets/images/7C.png';
import sevenS from '../assets/images/7S.png';
import eightH from '../assets/images/8H.png';
import eightD from '../assets/images/8D.png';
import eightC from '../assets/images/8C.png';
import eightS from '../assets/images/8S.png';
import nineH from '../assets/images/9H.png';
import nineD from '../assets/images/9D.png';
import nineC from '../assets/images/9C.png';
import nineS from '../assets/images/9S.png';
import tenH from '../assets/images/10H.png';
import tenD from '../assets/images/10D.png';
import tenC from '../assets/images/10C.png';
import tenS from '../assets/images/10S.png';
import jackH from '../assets/images/JH.png';
import jackD from '../assets/images/JD.png';
import jackC from '../assets/images/JC.png';
import jackS from '../assets/images/JS.png';
import queenH from '../assets/images/QH.png';
import queenD from '../assets/images/QD.png';
import queenC from '../assets/images/QC.png';
import queenS from '../assets/images/QS.png';
import kingH from '../assets/images/KH.png';
import kingD from '../assets/images/KD.png';
import kingC from '../assets/images/KC.png';
import kingS from '../assets/images/KS.png';
import aceH from '../assets/images/AH.png';
import aceD from '../assets/images/AD.png';
import aceC from '../assets/images/AC.png';
import aceS from '../assets/images/AS.png';



class CardDeck extends Component() {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.deck();
    }
    card(value, name, suit, image) {
        this.value = value;
        this.name = name;
        this.suit = suit;
        this.image = "images/" + this.name + this.suit + ".png";
    }

    deck() {
        this.names = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
        this.suits = ['H', 'D', 'S', 'C'];
        const cardDeck = [];
        for (let s = 0; s < this.suits.length; s++) {
            for (let n = 0; n < this.names.length; n++) {
                const allCards = new card(this.value = n + 1, this.names[n], this.suits[s], this.image)
                if (allCards.value > 10) {
                    allCards.value = 10;
                }
                cardDeck.push(allCards);
            }
        }
        return cardDeck;
    }
}



export default CardDeck;