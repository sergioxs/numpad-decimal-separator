﻿function triggerNumpadDecimalSeperator(el) {
	var eventKeydown = $.Event("keydown");
	eventKeydown.keyCode = jQuery.browser.opera ? 78 : 110;
	var eventKeypress = $.Event("keypress");
	eventKeypress.charCode = ".".charCodeAt(0);
	el.trigger(eventKeydown).trigger(eventKeypress);
} 

function assertCommaPresent(el){
	same(el.val(), ",", "assert that numpad separator is comma");
}

function assertSpacePresent(el){
	same(el.val(), " ", "assert that numpad separator is space");
}

module("setup default options", {
	setup: function() {
		$("#testInput").numpadDecSeparator();
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test with default option", function() {
	assertCommaPresent($("#testInput"));
});

module("setup multiple elements", {
	setup: function() {
		$("#testInput").numpadDecSeparator();
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
		$("#testInput2").numpadDecSeparator({separator: ' '});
		$("#testInput2").focus();
		triggerNumpadDecimalSeperator($("#testInput2"));
	}
});

test("test with multiple elements", function() {
	assertCommaPresent($("#testInput"));
	assertSpacePresent($("#testInput2"));
});

module("setup initialize twice", {
	setup: function() {
		$("#testInput").numpadDecSeparator().numpadDecSeparator();
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test initialize twice", function() {
	assertCommaPresent($("#testInput"));
});

module("setup replace selection", {
	setup: function() {
		$("#testInput").numpadDecSeparator();
		$("#testInput").val("12345").setSelection(1,4);
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test replace selection", function() {
	same($("#testInput").val(), "1,5", "assert that selected text is replaced with comma");
});

module("setup for readonly", {
	setup: function() {
		$("#testInput").attr("readonly", true);
		$("#testInput").numpadDecSeparator({separator: ' '});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test with readonly input", function() {
	var data = $("#testInput").data('numpadDecSeparator');
	ok(!data, "a readonly input should have no data");
	equal($("#testInput").val(),"");
});

module("setup seperator option SPACE", {
	setup: function() {
		$("#testInput").numpadDecSeparator({separator: 'SPACE'});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test with seperator option as SPACE", function() {
	assertSpacePresent($("#testInput"));
});

module("setup seperator option COMMA", {
	setup: function() {
		$("#testInput").numpadDecSeparator({separator: 'COMMA'});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test with seperator option as COMMA", function() {
	assertCommaPresent($("#testInput"));
});

module("setup seperator option apostrophe", {
	setup: function() {
		$("#testInput").numpadDecSeparator({separator: '\''});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test with seperator option as apostrophe", function() {
	same($("#testInput").val(), "'", "assert that numpad separator is comma");
});

module("setup seperator option space", {
	setup: function() {
		$("#testInput").numpadDecSeparator({separator: ' '});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	}
});

test("test with seperator option as space", function() {
	assertSpacePresent($("#testInput"));
});

test("test unbind removes data", function() {
	assertSpacePresent($("#testInput"));
	var data = $("#testInput").data('numpadDecSeparator');
	ok(data, "before unbind data should be present");
	$("#testInput").numpadDecSeparator('unbind');
	data = $("#testInput").data('numpadDecSeparator');
	ok(!data, "after unbind data should not be present");
});

test("test unbind", function() {
	same($("#testInput").val(), " ", "assert that numpad separator before unbind is space");
	$("#testInput").numpadDecSeparator('unbind');
	$("#testInput").val("");
	triggerNumpadDecimalSeperator($("#testInput"));
	var valueAfterUnbind = $("#testInput").val();
	notEqual(valueAfterUnbind, " ", "assert that after unbind numpad separator is not space");
});

module("setup for mergeDefaults", {
});

test("test merge seperator", function() {
	var pdv = $.fn.numpadDecSeparator.defaults['predefinedVariables'];
	$.fn.numpadDecSeparator('mergeDefaults', {separator: "SPACE"});
	same($.fn.numpadDecSeparator.defaults['separator'], "SPACE", "merged default separator should be SPACES");
	ok(!$.fn.numpadDecSeparator.defaults['useRegionalSettings'], "merged default useRegionalSettings should remain false");
	same($.fn.numpadDecSeparator.defaults['predefinedVariables'], pdv, "merged default predefinedVariables should be the same as before merge");
});

test("test merge useRegionalSettings", function() {
	$.fn.numpadDecSeparator('mergeDefaults', {useRegionalSettings: true});
	ok($.fn.numpadDecSeparator.defaults['useRegionalSettings'], "merged default useRegionalSettings should be true");
});

test("test merge predefinedVariables", function() {
	var pdvApos = {APOSTROPHE: "'"};
	$.fn.numpadDecSeparator('mergeDefaults', {predefinedVariables: pdvApos});
	same($.fn.numpadDecSeparator.defaults['predefinedVariables'], pdvApos, "merged default predefinedVariables should be APOSTROPHE");
});

test("test merge all", function() {
	var newDefaults = {
		separator : ' ',
		useRegionalSettings : true,
		predefinedVariables: {SPACE: " "}
	};
	$.fn.numpadDecSeparator('mergeDefaults', newDefaults);
	same($.fn.numpadDecSeparator.defaults, newDefaults, "all defaults should be merged");
});

//this only works in msie and mozilla and regional settings of OS set to nl or equivalent (where decimal seperator is comma)
if(jQuery.browser.msie || jQuery.browser.mozilla) {
	module("setup with regional settings, regional settings of OS for decimal seperator should be comma", {
		setup: function() {
			$("#testInput").numpadDecSeparator({useRegionalSettings: true});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
		}
	});	
	test("test with useRegionalSettings true", function() {
		assertCommaPresent($("#testInput"));
	});
}












