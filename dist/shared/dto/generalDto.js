"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalDto = exports.GeneralDto = void 0;
const date_utils_1 = require("../utils/date.utils");
class GeneralDto {
    loginReturn(user) {
        const { account, address, country, email, fullName, lastName, phone, postalCode, favoriteContacts } = user;
        const { accountAmount, accountCard, accountNumber, alias, associateCards, business } = account[0];
        const { cardNumber, cvv, expiration, emission, isActive } = accountCard[0];
        return {
            profile: {
                fullName,
                lastName,
                phone,
                postalCode,
                email,
                address,
                country,
            },
            favoriteContacts: this.favoriteContactsFilter(favoriteContacts),
            accountInfo: {
                amount: accountAmount[0].amount,
                accountNumber,
                alias,
                dominoCard: {
                    cardNumber,
                    cvv,
                    expiration,
                    emission,
                    isActive
                },
                associateCards: this.filterCards(associateCards),
            },
            movements: this.businessFilter(business),
        };
    }
    filterCards(cards = []) {
        const arrayCards = [];
        cards.forEach((card) => {
            const cardFilter = {
                cardNumber: card.cardNumber,
                holder: card.cardholder,
                cvv: card.cvv,
                issuingEntity: card.issuingEntity,
            };
            arrayCards.push(cardFilter);
        });
        return arrayCards;
    }
    businessFilter(business = []) {
        const arrayBusiness = [];
        business.forEach((b) => {
            const newBusiness = {
                status: b.status,
                amount: b.amount,
                subject: b.subject,
                transaction: b.transaction,
                date: date_utils_1.dateHandler.formatDate(b.createdAt),
            };
            arrayBusiness.push(newBusiness);
        });
        return arrayBusiness;
    }
    favoriteContactsFilter(contacts = []) {
        const arrayContacts = [];
        contacts.forEach((contact) => {
            const newContact = {
                accountNumber: contact.accountUser.accountNumber,
                alias: contact.accountUser.alias,
                nickName: contact.nickname,
            };
            arrayContacts.push(newContact);
        });
        return arrayContacts;
    }
}
exports.GeneralDto = GeneralDto;
exports.generalDto = new GeneralDto();
