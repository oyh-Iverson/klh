$(function() {
    pushHistory();
});
function pushHistory() {
    window.addEventListener("popstate", function(e) {
        self.location.reload();
    }, false);
    var state = {
        title : "",
        url : ""
    };
    window.history.replaceState(state, "", "");
};