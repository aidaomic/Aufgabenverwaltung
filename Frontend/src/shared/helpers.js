export function getStatusValues(status) {
    const StatusMap = {
        Idea: { colour: "deep-purple", icon: "bulb" },
        "Todo Next": { colour: "pink", icon: "clipboard-list" },
        Doing: { colour: "orange", icon: "writing" },
        "in Review": { colour: "blue", icon: "question-mark" },
        Done: { colour: "teal", icon: "check" },
    };

    return StatusMap[status];
}
export function getDueDateColour(dueDate) {
    var dateOfDueDate = new Date(dueDate);

    var now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0, 0);

    var tomorrow = new Date(now);
    var threeDaysPast = new Date(now);

    tomorrow.setDate(tomorrow.getDate() + 1);
    threeDaysPast.setDate(threeDaysPast.getDate() - 3);

    if (dateOfDueDate.getTime() <= threeDaysPast.getTime()) return "light-pink";
    if (dateOfDueDate.getTime() <= now.getTime()) return "pink";
    if (dateOfDueDate.getTime() == tomorrow.getTime()) return "orange";
}
