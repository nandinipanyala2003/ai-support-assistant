const sendSocketEvent = (io, event, data) => {

    if (!io) return;

    io.emit(event, data);
};

module.exports = {
    sendSocketEvent
};