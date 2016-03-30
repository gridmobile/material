describe('md-colors', function () {
  beforeEach(module('material.components.colors'));

  it('should accept color palette', inject(function($compile, $rootScope, $mdColorPalette) {
    var element = $compile('<div md-colors="{background: \'red\'}"></div>')($rootScope.$new());

    $rootScope.$apply();

    var red500 = $mdColorPalette['red']['500'].value;
    expect(element[0].style.background).toContain('rgb(' + red500[0] + ', ' + red500[1] + ', ' + red500[2] + ')');
  }));

  describe('two worded palette', function () {
    it('should accept palette spliced with dash', inject(function ($compile, $rootScope, $mdColorPalette) {
      var element = $compile('<div md-colors="{background: \'blue-grey\'}"></div>')($rootScope.$new());

      $rootScope.$apply();

      var red500 = $mdColorPalette['blue-grey']['500'].value;
      expect(element[0].style.background).toContain('rgb(' + red500[0] + ', ' + red500[1] + ', ' + red500[2] + ')');
    }));

    it('should accept palette formatted as camelCase', inject(function ($compile, $rootScope, $mdColorPalette) {
      var element = $compile('<div md-colors="{background: \'blueGrey\'}"></div>')($rootScope.$new());

      $rootScope.$apply();

      var red500 = $mdColorPalette['blue-grey']['500'].value;
      expect(element[0].style.background).toContain('rgb(' + red500[0] + ', ' + red500[1] + ', ' + red500[2] + ')');
    }));
  });

  it('should accept color palette and hue', inject(function($compile, $rootScope, $mdColorPalette) {
    var element = $compile('<div md-colors="{background: \'red-200\'}"></div>')($rootScope.$new());

    $rootScope.$apply();

    var red200 = $mdColorPalette['red']['200'].value;
    expect(element[0].style.background).toContain('rgb(' + red200[0] + ', ' + red200[1] + ', ' + red200[2] + ')');
  }));

  it('should accept color palette, hue and opacity', inject(function($compile, $rootScope, $mdColorPalette) {
    var element = $compile('<div md-colors="{background: \'red-200-0.8\'}"></div>')($rootScope.$new());

    $rootScope.$apply();

    var red200 = $mdColorPalette['red']['200'].value;
    expect(element[0].style.background).toContain('rgba(' + red200[0] + ', ' + red200[1] + ', ' + red200[2] + ', ' + 0.8 + ')');
  }));

  describe ('themes', function() {
    it('should accept primary palette', inject(function($compile, $rootScope, $mdTheming, $mdColorPalette) {
      var type = 'primary';
      var element = $compile('<div md-colors="{background: \'' + type + '\'}"></div>')($rootScope.$new());

      $rootScope.$apply();
      var paletteName = $mdTheming.THEMES['default'].colors[type].name;

      var color = $mdColorPalette[paletteName]['500'].value;
      expect(element[0].style.background).toContain('rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')');
    }));

    it('should accept accent palette', inject(function($compile, $rootScope, $mdTheming, $mdColorPalette) {
      var type = 'accent';
      var element = $compile('<div md-colors="{background: \'' + type + '\'}"></div>')($rootScope.$new());

      $rootScope.$apply();
      var paletteName = $mdTheming.THEMES['default'].colors[type].name;

      var color = $mdColorPalette[paletteName]['500'].value;
      expect(element[0].style.background).toContain('rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')');
    }));

    it('should accept warn palette', inject(function($compile, $rootScope, $mdTheming, $mdColorPalette) {
      var type = 'warn';
      var element = $compile('<div md-colors="{background: \'' + type + '\'}"></div>')($rootScope.$new());

      $rootScope.$apply();
      var paletteName = $mdTheming.THEMES['default'].colors[type].name;

      var color = $mdColorPalette[paletteName]['500'].value;
      expect(element[0].style.background).toContain('rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')');
    }));

    it('should accept background palette', inject(function($compile, $rootScope, $mdTheming, $mdColorPalette) {
      var type = 'background';
      var element = $compile('<div md-colors="{background: \'' + type + '\'}"></div>')($rootScope.$new());

      $rootScope.$apply();
      var paletteName = $mdTheming.THEMES['default'].colors[type].name;

      var color = $mdColorPalette[paletteName]['500'].value;
      expect(element[0].style.background).toContain('rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')');
    }));

    describe('custom themes', function () {
      beforeEach(function () {
        module('material.core', function ($mdThemingProvider) {
          $mdThemingProvider.theme('myTheme')
            .primaryPalette('light-blue')
            .accentPalette('yellow');
        });
      });

      it('should accept theme, color palette, hue and opacity', inject(function ($compile, $rootScope, $mdColorPalette) {
        var element = $compile('<div md-colors="{background: \'myTheme-primary-200-0.8\'}"></div>')($rootScope.$new());

        $rootScope.$apply();

        var red200 = $mdColorPalette['light-blue']['200'].value;
        expect(element[0].style.background).toContain('rgba(' + red200[0] + ', ' + red200[1] + ', ' + red200[2] + ', ' + 0.8 + ')');
      }));
    });
  });
  
  describe ('watched values', function () {
    it('should accept interpolated value', inject(function ($compile, $rootScope, $mdColorPalette) {
      var scope = $rootScope.$new();

      var element = $compile('<div md-colors="{background: \'{{color}}\'}"></div>')(scope);

      scope.$apply();
      expect(element[0].style.background).not.toContain('rgb');

      scope.color = 'lightBlue-200-0.8';
      scope.$apply();

      var color = $mdColorPalette['light-blue']['200'].value;
      expect(element[0].style.background).toContain('rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + 0.8 + ')');
    }));

    it('should accept function', inject(function ($compile, $rootScope, $mdColorPalette) {
      var scope = $rootScope.$new();

      var element = $compile('<div md-colors="{background: color()}"></div>')(scope);

      scope.color = function () {
        return 'lightBlue-200-0.8';
      };

      scope.$apply();

      var color = $mdColorPalette['light-blue']['200'].value;
      expect(element[0].style.background).toContain('rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + 0.8 + ')');
    }));

    it('should accept ternary value', inject(function ($compile, $rootScope, $timeout, $mdColorPalette) {
      var scope = $rootScope.$new();

      scope.checked = false;

      var element = $compile('<div md-colors="{background: \'{{checked ? \'red\' : \'lightBlue\'}}\'}"></div>')(scope);

      scope.$apply();

      var color = $mdColorPalette['light-blue']['500'].value;
      expect(element[0].style.background).toContain('rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')');

      scope.checked = true;

      scope.$apply();
      $timeout.flush();

      var red = $mdColorPalette['red']['500'].value;
      expect(element[0].style.background).toContain('rgb(' + red[0] + ', ' + red[1] + ', ' + red[2] + ')');
    }));
  })
});