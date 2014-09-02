/* global jQuery, _ */
var oneApp = oneApp || {}, $oneApp = $oneApp || jQuery(oneApp);

(function (window, $, _, oneApp) {
	'use strict';

	oneApp.OverlayView = Backbone.View.extend({
		events: function() {
			return _.extend({}, oneApp.SectionView.prototype.events, {
				'click .ttfmake-overlay-close' : 'closeOnClick'
			});
		},

		open: function() {
			$oneApp.trigger('overlayOpen', this.$el);
			this.$el.show();
		},

		close: function() {
			$oneApp.trigger('overlayClose', this.$el);
			this.$el.hide();

			// Pass the new content to the iframe and textarea
			oneApp.setTextArea(oneApp.getActiveTextAreaID());
			oneApp.filliframe(oneApp.getActiveiframeID(), {format: 'raw'});
		},

		closeOnClick: function(e) {
			e.preventDefault();
			this.close();
		}
	});

	// Initialize available gallery items
	oneApp.initOverlayViews = function () {
		oneApp.tinymceOverlay = new oneApp.OverlayView({
			el: $('#ttfmake-tinymce-overlay')
		});
	};

	// Initialize the views when the app starts up
	oneApp.initOverlayViews();
})(window, jQuery, _, oneApp);