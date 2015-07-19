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
                    $alphaContainer.addClass('open');
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

                if(this._isItFriday()){
                    $alphaContainer.append('<div class="freeze-clock"></div>');
                }

                if(this._isItSunday()){
                    $alphaContainer.append('<div class="freeze-clock"></div>');
                }
            },

            _isAlphaClosed: function() {
                for (var i = 0; i < rules.alpha.length; i++) {
                    if (day === rules.alpha[i]) {
                        $omegaContainer.append('<div class="freeze-clock"></div>');
                        return true;
                        
                    }
                }

                return false;
            },

            _isOmegaClosed: function() {
                for (var i = 0; i < rules.omega.length; i++) {
                    if (day === rules.omega[i]) {
                        $alphaContainer.append('<div class="freeze-clock"></div>');
                        return true;
                    }
                }

                return false;
            },

            _isItFriday: function() {
                if (day == 5) {
                    return true
                }

                return false
            },

            _isItSunday: function() {
                if (day == 0) {
                    return true
                }

                return false
            }
        };

        return app;
    })();

    CodeFreeze.init();

    var freezeDate;
    var d = new Date();

    switch(new Date().getDay()) { 
        case 0: //sunday
            freezeDate = d.setHours(24,0,0,0); // alpha freezes tonight @ midnight
            break;
        case 1: //monday
            freezeDate = d.setHours(48,0,0,0); // omega freezes tmrw @ midnight
            break;
        case 2: //tuesday
            freezeDate = d.setHours(24,0,0,0); // omega freezes tonight @ midnight
            break;
        case 3: //wednesday
            freezeDate = d.setHours(72,0,0,0); // alpha freezes friday @ midnight
            break;
        case 4: //thursday
            freezeDate = d.setHours(48,0,0,0); // alpha freezes tmrw @ midnight
            break;
        case 5: //friday
            freezeDate = d.setHours(24,0,0,0); // alpha freezes tonight @ midnight
            break;

        // case 6:
        //     freezeDate = d.setHours(24,0,0,0);
        //     break;

        //TO DO: figure out the weekend countdowns
    }

    var now = new Date();

    var nextFreeze = d.getTime() / 1000;
    var today = now.getTime() / 1000;
    var timeDiff = nextFreeze - today;

    var clock = $('.freeze-clock').FlipClock(timeDiff, {
        clockFace: 'DailyCounter',
        countdown: true
    });
});
