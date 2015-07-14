$(document).ready(function() {
    var CodeFreeze = (function() {
        var day;
        var snowParticles   = 40;
        var openStatus      = 'Open';
        var closedStatus    = 'Frozen';
        var $alphaContainer = $('.alpha');
        var $omegaContainer = $('.omega');
        var $alphaStatus    = $('.alpha .status');
        var $omegaStatus    = $('.omega .status');

        // Days that there is a code freeze
        var rules = {
            alpha : [1, 2],
            omega : [3, 4]
        };

        var app = {
            init: function() {
                var date = new Date();
                day = date.getDay();
                this.render();
            },

            render: function() {
                if (this._isAlphaClosed()) {
                    $alphaContainer.addClass('closed');
                    $alphaStatus.text(closedStatus);

                    for (var i = 0; i < snowParticles; i++) {
                        $alphaContainer.find('.snow').append('<span></span>');
                    }
                } else {
                    $alphaContainer.addClass('open')
                    $alphaStatus.text(openStatus);
                }

                if (this._isOmegaClosed()) {
                    $omegaContainer.addClass('closed');
                    $omegaStatus.text(closedStatus);

                    for (var i = 0; i < snowParticles; i++) {
                        $omegaContainer.find('.snow').append('<span></span>');
                    }
                } else {
                    $omegaContainer.addClass('open');
                    $omegaStatus.text(openStatus);
                }
            },

            _isAlphaClosed: function() {
                for (var i = 0; i < rules.alpha.length; i++) {
                    if (day === rules.alpha[i]) {
                        return true;
                    }
                }

                return false;
            },

            _isOmegaClosed: function() {
                for (var i = 0; i < rules.omega.length; i++) {
                    if (day === rules.omega[i]) {
                        return true;
                    }
                }

                return false;
            }
        };

        return app;
    })();

    CodeFreeze.init();
});
