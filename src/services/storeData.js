const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

async function storeData(id, data) {
    const predictCollection = db.collection('predictions');
    return predictCollection.doc(id).set(data);
}

async function getHistories(request, h) {
    const predictCollection = db.collection('predictions');

    const querySnapshot = await predictCollection.get();

    const histories = [];
    querySnapshot.forEach(doc => {
        const documentData = doc.data();
        const result = documentData.result;
        const createdAt = documentData.createdAt;
        const suggestion = documentData.suggestion;
        
        histories.push({
            id: doc.id,
            history: {
                result: result,
                createdAt: createdAt,
                suggestion: suggestion,
                id: doc.id
            }
        });
    });

    const response = h.response({
        status: 'success',
        data: histories
    })
    response.code(200);
    return response;
    
}

module.exports = { storeData, getHistories };