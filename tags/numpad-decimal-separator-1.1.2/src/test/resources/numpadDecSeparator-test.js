var version = "1.1.2";

TestCase("VersionTestCase", {
	testNumpadDecSeparatorShouldReturnCorrectVersion : function() {
		assertEquals("Version should be correct", version , $.fn.numpadDecSeparator('version'));
	}
});
TestCase("DefaultOptionTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator();
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testNumpadDecSeparatorShouldBeComma : function() {
		assertCommaPresent($("#testInput"));
	}
});

TestCase("MultipleElementsTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator();
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
		
		addInputToDOM('testInput2');
		$("#testInput2").numpadDecSeparator({separator: ' '});
		$("#testInput2").focus();
		triggerNumpadDecimalSeperator($("#testInput2"));
	},
	testTwoElementsWithDifferentOption : function() {
		assertCommaPresent($("#testInput"));
		assertSpacePresent($("#testInput2"));
	}
});

TestCase("InitializeTwiceTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator().numpadDecSeparator();
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testInitializeTwiceShouldReturnOnlyOneComma : function() {
		assertCommaPresent($("#testInput"));
	}
});

TestCase("ReplaceSelectionTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator();
		$("#testInput").val("12345").setSelection(1,4);
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testShouldReplaceSelection : function() {
		assertEquals("Selected text should be replaced with comma", "1,5" , $("#testInput").val());
	}
});

TestCase("ReadOnlyTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").attr("readonly", true);
		$("#testInput").numpadDecSeparator({separator: ' '});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testReadOnlyFields : function() {
		var data = $("#testInput").data('numpadDecSeparator');
		assertTrue("a readonly input should have no data", !data);
		assertEquals("" , $("#testInput").val());
	}
});

TestCase("SeparatorOptionTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator({separator: ' '});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testSeperatorOptionAsSpace : function() {
		assertSpacePresent($("#testInput"));
	}
});

TestCase("SeparatorOptionWithPredifinedSPACEVariableTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator({separator: 'SPACE'});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testSeperatorOptionAsSPACE : function() {
		assertSpacePresent($("#testInput"));
	}
});

TestCase("SeparatorOptionWithPredifinedCOMMAVariableTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator({separator: 'COMMA'});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testSeperatorOptionAsCOMMA : function() {
		assertCommaPresent($("#testInput"));
	}
});

TestCase("SeparatorOptionWithApostropheVariableTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator({separator: '\''});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testSeperatorOptionAsApostrophe : function() {
		assertEquals("numpad separator should be apostrophe", "'", $("#testInput").val());
	}
});

TestCase("UnbindTestCase", {
	setUp: function() {
		addInputToDOM('testInput');
		$("#testInput").numpadDecSeparator({separator: ' '});
		$("#testInput").focus();
		triggerNumpadDecimalSeperator($("#testInput"));
	},
	testUnbindRemovesData : function() {
		assertSpacePresent($("#testInput"));
		var data = $("#testInput").data('numpadDecSeparator');
		assertTrue("before unbind data should be present", !!data);
		$("#testInput").numpadDecSeparator('unbind');
		data = $("#testInput").data('numpadDecSeparator');
		assertTrue("after unbind data should not be present", !data);
	},
	testUnbind : function() {
		assertEquals("assert that numpad separator before unbind is space", " ", $("#testInput").val());
		$("#testInput").numpadDecSeparator('unbind');
		$("#testInput").val("");
		triggerNumpadDecimalSeperator($("#testInput"));
		var valueAfterUnbind = $("#testInput").val();
		assertNotEquals("assert that after unbind numpad separator is not space", " ", valueAfterUnbind);
	}
});

TestCase("MergeDefaultsTestCase", {
	testMergeSeparator : function() {
		var pdv = $.fn.numpadDecSeparator.defaults['predefinedVariables'];
		$.fn.numpadDecSeparator('mergeDefaults', {separator: "SPACE"});
		assertEquals("merged default separator should be SPACES", "SPACE", $.fn.numpadDecSeparator.defaults['separator']);
		assertFalse("merged default useRegionalSettings should remain false", $.fn.numpadDecSeparator.defaults['useRegionalSettings']);
		assertEquals("merged default predefinedVariables should be the same as before merge", pdv, $.fn.numpadDecSeparator.defaults['predefinedVariables']);
	},
	testMergeUseRegionalSettings : function() {
		$.fn.numpadDecSeparator('mergeDefaults', {useRegionalSettings: true});
		assertTrue("merged default useRegionalSettings should be true", $.fn.numpadDecSeparator.defaults['useRegionalSettings']);
	},
	testMergePredefinedVariables : function() {
		var pdvApos = {APOSTROPHE: "'"};
		$.fn.numpadDecSeparator('mergeDefaults', {predefinedVariables: pdvApos});
		assertEquals("merged default predefinedVariables should be APOSTROPHE", pdvApos, $.fn.numpadDecSeparator.defaults['predefinedVariables']);
	},
	testMergeAll : function() {
		var newDefaults = {
			separator : ' ',
			useRegionalSettings : true,
			predefinedVariables: {SPACE: " "}
		};
		$.fn.numpadDecSeparator('mergeDefaults', newDefaults);
		assertEquals("all defaults should be merged", newDefaults, $.fn.numpadDecSeparator.defaults);
	}
});

//this only works in msie and mozilla and regional settings of OS set to nl or equivalent (where decimal seperator is comma)
if(jQuery.browser.msie || jQuery.browser.mozilla) {
	TestCase("RegionalSettingsTestCase", {
		setUp: function() {
			addInputToDOM('testInput');
			$("#testInput").numpadDecSeparator({useRegionalSettings: true});
			$("#testInput").focus();
			triggerNumpadDecimalSeperator($("#testInput"));
		},
		testRegionalSettings: function() {
			assertEquals("numpad separator should be comma, if test fails => check regional settings of OS => decimal seperator should be comma", ",", $("#testInput").val());
		}
	});
}