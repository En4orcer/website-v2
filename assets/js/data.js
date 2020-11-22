
(function ($) {

    "use strict";
    /* not sure why but when I create the ID in index, it comes back result+"undefined." i.e: 12345undefined */

    var printRepoStars = function () {
        return {
            url: 'https://api.github.com/users/Cache-core/repos',
            callback: function () {
                var responseObj = JSON.parse(this.responseText);
                var stars = 0;
                for (var i = 0; i <= responseObj.length - 1; i++) {
                    stars += responseObj[i].stargazers_count;
                }
                var el = $('#stats-github-stars');
                el.html(stars + '<em>' + el.find('em').html() + '</em>');
            }
        }
    }

    var printRepoContribs = function () {
        return {
            url: 'https://api.github.com/repos/Cache-core/Testnet/contributors',
            callback: function () {
                var responseObj = JSON.parse(this.responseText);
                var contributors = responseObj[0].contributions;
                var el = $('#stats-contributors');
                el.html(contributors + '<em>' + el.find('em').html() + '</em>');
            }
        }
    }

    var printNetworkStats = function () {
        return {
            url: 'https://letshash.online:14002/stats',
            callback: function () {
                var responseObj = JSON.parse(this.responseText);
                var el = $('#stats-blockchain-height');
                el.html(responseObj.network.height + '<em>' + el.find('em').html() + '</em>');
                var el = $('#stats-block-reward');
                el.html(responseObj.lastblock.reward / 100000 + '<em>' + el.find('em').html() + '</em>');
            }
        }
    }

    var fetchStats = function (fnc) {
        var request = new XMLHttpRequest();
        request.onload = fnc().callback;
        request.open('get', fnc().url, true)
        request.send();
    };


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {
        fetchStats(printRepoStars);
        fetchStats(printRepoContribs);
        fetchStats(printNetworkStats);
    })();

})(jQuery);
