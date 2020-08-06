(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}



// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$SelectLevel = function (a) {
	return {$: 'SelectLevel', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$SokobanLevels$SokobanLevel = F6(
	function (title, date, numberOfLevels, author, description, link) {
		return {author: author, date: date, description: description, link: link, numberOfLevels: numberOfLevels, title: title};
	});
var $author$project$SokobanLevels$sokobanLevels = _List_fromArray(
	[
		A6($author$project$SokobanLevels$SokobanLevel, '100 Boxes', '2010-05-18', 10, 'François Marques', 'This collection includes 10 small levels of 10 packages each. It is intended for the expert who has a few (many) hours in front of them.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=100Boxes.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, '100,000 moves only', '2005-10-02', 10, 'Vipul Patel', 'Goal is to solve the levels with maximum 100,000 moves.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=100k_Moves_Only.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, '12 Blocks', '2014-03-14', 25, 'xbluejimx', '12 Blocks collection by xbluejimx', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=12_Blocks.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, '23x11', '2012-05-13', 3, 'Carlos Montiers', 'Three puzzles of 23x11', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=23x11.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, '696', '2014-03-25', 694, 'Dries de Clercq', '696 collection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=696.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, '81', '2005-10-02', 25, 'Thomas Reinke', '25 fairly easy levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=81.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'A.K.K. Informatika', '2010-08-04', 32, 'Péter Asztalos', 'These levels were created by Péter Asztalos, Budapest, Hungary', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AKK_Informatika.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'AC Diamonds', '2015-07-02', 21, 'Andrej Cerjak', 'This small collection starts with easy puzles (first eleven) continues with more challenging ones in the second half with those try to avoid', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AC_Diamonds.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'AC Easy', '2015-06-17', 20, 'Andrej Cerjak', 'AC Easy collection by Andrej Cerjak', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AC_Easy.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'AC Selected', '2015-07-02', 46, 'Andrej Cerjak', 'This collection is as its name suggests the selection of my best sokoban puzzles. The puzzles have been created during a long period of time, some of them more than 15 years ago. Many puzzles almost got lost (some others did), after creating them I forgot about them and rediscovered some of them much later only by chance. in order not to get lost something I enjoyed doing from time to time many years, I finally decided to make this effort of making final arrangements and publish them. So here they are, I hope You enjoy solving them :-) Puzzles are arranged from easier to more challenging, with some exception - obviously the last one, which is probabli not the most difficult one, but it certainly requires the largest number of moves (approx. 15k moves of which 5k pushes) Very easy can be considered also puzzles 13 & 14 (Butterflies 1&2), while Butterfly 3 requires a little bit more solving effort. For solving the puzzles at the end of the collection see also my', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AC_Selected.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'AC-Smileys', '2015-07-13', 21, 'Andrej Cerjak', 'A small collection in the shape of Smileys, arranged from very easy to not so easy, the harder ones probably requre a little imagination to see the Smileys, on the other hand, those are more interesting to solve ;-)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AC_Smileys.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'AC-Smileys_2', '2015-10-26', 106, 'Andrej Cerjak', 'Another collection in the border shape of a smiley', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AC_Smileys_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'AC-Smileys_3', '2015-10-26', 202, 'Andrej Cerjak', 'Another collection in the metrics of smileys.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AC_Smileys_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alakina', '2013-11-03', 15, 'Eric F Tchong', '15 levels dedicated to my sweet granddaughter Alakina.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Alakina.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto', '2005-10-02', 50, 'Alberto García', 'Alberto Garcia - Alberto', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Alberto.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto García 1-1', '2005-10-02', 50, 'Alberto García', 'Levels created by Alberto García. Enjoy these beutiful levels created in several categories, Easy, Middle, Hard and Extra Hard (With many steps...) About me: I\'m a boy of 18 years-old. Comments Are Welcome: Feel free to contact me for suggestions or anything regarding my levels using the e-mail provided below. Thank You for playing. Enjoy It....!!!!!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AlbertoG1-1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto García 1-2', '2005-10-02', 49, 'Alberto García', 'Enjoy these beutiful levels created in several categories, Easy, Middle, Hard and Extra Hard (With many steps...) About me: I\'m a boy of 18 years-old. Comments Are Welcome: Feel free to contact me for suggestions or anything regarding my levels using the e-mail provided below. Thank You for playing. Enjoy It....!!!!!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AlbertoG1-2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto García 1-3', '2005-10-02', 50, 'Alberto García', 'Enjoy these beutiful levels created in several categories, Easy, Middle, Hard and Extra Hard (With many steps...) About me: I\'m a boy of 18 years-old. Comments Are Welcome: Feel free to contact me for suggestions or anything regarding my levels using the e-mail provided below. Thank You for playing. Enjoy It....!!!!!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AlbertoG1-3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto Garcia Arranged', '2014-03-01', 245, 'Alberto García, Spiros Mantzoukis', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Alberto_Garcia_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto García Best 4 U', '2005-10-02', 50, 'Alberto García', 'Enjoy these beutiful levels created in several categories, Easy, Middle, Hard and Extra Hard (With many steps...) About me: I\'m a boy of 18 years-old. Comments Are Welcome: Feel free to contact me for suggestions or anything regarding my levels using the e-mail provided below. Thank You for playing. Enjoy It....!!!!!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AlbertoG-Best4U.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto Garcia Plus 2', '2011-08-01', 199, 'Alberto García', 'Level collection by Alberto Garcia', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AlbertoG_Plus2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alberto Multipack', '2014-03-14', 247, 'Alberto García', 'The multipack contains collections by Alberto Garcia: boxes, Bonus, SokoBoxes, The best 4U, Sokomania, Fantasy; with removed duplicates, which were already on the site. The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Mark (merging of initial collections, renaming the new collection, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Alberto_Multipack.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Albizia', '2005-10-02', 25, 'Thomas Reinke', 'Handmade levels. Feel free to comment.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Albizia.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alejandro', '2013-10-31', 13, 'Eric F Tchong', 'Remodels of maps made by my grandson Alejandro. Enjoy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Alejandro.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'All Remodels', '2014-03-20', 174, 'Zhenying and others', 'Copyright: (c) by zhenying, and the authors of each puzzle Date: March 2013 Collection of the remodels of zhenying, collected by Jordi Doménech. This collection was downloaded from: Sokoban. The beautiful world of remodels http://sokoban-jd.blogspot.com/ These levels are copyright (c) by zhenying and the authors of each puzzle and may be freely distributed for non-commercial use provided they remain unchanged, credited with the author\'s name, and provided the author is notified.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=All_Remodels.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Alphabet Soup', '2011-02-09', 26, 'Michael C Falk', '26 very simple levels using the alphabet as a guide.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Alphabet_Soup.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Amazing Orimazing', '2010-01-25', 4, 'Marko Dzekic', 'The first sokoban-orimaze level was created by Dries de Clercq.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Amazing_Orimazing.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Anomaly', '2005-10-02', 30, 'Thomas Reinke', '30 small levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Anomaly.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Anomaly 2', '2005-10-02', 30, 'Thomas Reinke', '30 smallish levels, arranged in rough order of difficulty. All have some sort of pattern to them.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Anomaly_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Anomaly 3', '2012-02-25', 50, 'Thomas Reinke', 'Another installment of my Anomaly series. This one contains 50 levels of between 4-6 boxes. I tried to arrange each puzzle so that the goals and boxes had some form of symmetry, while also maintaining difficulty. This set is much harder than the previous ones in the anomaly series. Enjoy!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Anomaly_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Armada Collection 1', '2013-05-22', 9, 'Milutin Negovanovic', 'Armada collection by Milutin Negovanovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Armada_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba1', '2005-10-02', 10, 'Eric F Tchong', 'My first set from Aruba. Easy kids stuff. Lowest moves or pushes makes it still interesting.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba_eric.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba10', '2005-10-02', 100, 'Eric F Tchong', 'The last one of Aruba series 100 levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba2', '2005-10-02', 12, 'Eric F Tchong', 'Aruba2 collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba3', '2005-10-02', 46, 'Eric F Tchong', 'Serie no.3 Between all those very difficult ones I start with easy to diffcult. Thanks for giving Aruba a way to express himself.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba4', '2005-10-02', 40, 'Eric F Tchong', 'Serie no.4.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba5', '2005-10-02', 47, 'Eric F Tchong', 'Serie no 5.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba5.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba6', '2005-10-02', 40, 'Eric F Tchong', 'Aruba series no.6', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba6.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba7', '2005-10-02', 40, 'Eric F Tchong', 'Lucky set no.7', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba7.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba8', '2005-10-02', 40, 'Eric F Tchong', 'Series no.8', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba8.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Aruba9', '2005-10-02', 40, 'Eric F Tchong', 'Series no. 9 I\'m getting a lot of good reactions on my series.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Aruba9.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas01', '2005-10-02', 100, 'Eric F Tchong', 'For the holidays a new series no.1 Merry Xmas and a Happy New Year...', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas02', '2005-10-02', 100, 'Eric F Tchong', 'Second level of my atlas series.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas03', '2005-10-02', 100, 'Eric F Tchong', 'After a fine 3 weeks vacation in Holland I hereby present you my new atlas03 series. I hope you enjoy these levels as much as I do when developing them and tell me if you did like them.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas03.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas04', '2005-10-02', 100, 'Eric F Tchong', 'Here we go again atlas no.4 Enjoy and tell me how U like it...', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas04.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas05', '2005-10-02', 100, 'Eric F Tchong', 'With love from Aruba!!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas05.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas06', '2005-10-02', 100, 'Eric F Tchong', 'My christmas present 2006. Enjoy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas06.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas07', '2005-10-02', 100, 'Eric F Tchong', '100 new levels for 2007. Enjoy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas07.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas08', '2005-10-02', 100, 'Eric F Tchong', 'The Atlas08 collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas08.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas09', '2005-10-02', 101, 'Eric F Tchong', 'The Atlas09 collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas09.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Atlas10', '2005-10-02', 100, 'Eric F Tchong', 'Atlas 10 is the last one of the atlas series. Enjoy and give me your comments on these levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Atlas10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Attrition', '2010-11-16', 29, 'Razorflame', '30 levels that I made by hand, including a variety of 30 different levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Attrition.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Attrition 2', '2009-10-31', 30, 'Razorflame', 'These levels are getting harder for me to solve. In fact, I was unable to solve most of the levels after Level 10, however, I did use a solver to make sure that they were solvable. This level collection is the 2nd part of my Attrition level set. Hope you enjoy them! Please leave me comments at my email address. Thanks!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Attrition_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Attrition 3', '2014-01-07', 100, 'Razorflame', 'My third set of hand-made levels. These levels include some of my best hand-made levels to date, and are designed with the design and difficulty of each puzzle in mind.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Attrition_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Attrition 4', '2014-03-09', 21, 'Razorflame', 'Attrition 4 collection by Razorflame', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Attrition_4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Avala', '2013-07-18', 18, 'Milutin Negovanovic', 'Avala collection by Milutin Negovanovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Avala.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Back to origins', '2011-12-30', 3, 'Tolle', 'Classic-type levels.That means that goals are not randomly placed all over the screen, unlike most of the other creators do.Everyone who played classic 50 levels know what I mean by that.It contains only 3 levels because I want to know what do you think about them and should I create more.Please tell me what do you think.Thanks', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Back_to_origins.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Banja Koviljaca', '2013-01-14', 25, 'Zivojin Trifunovic', 'Banja Koviljaca by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Banja_Koviljaca.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Barona', '2005-10-02', 14, 'Stanislav Kanev', 'A set of 14 levels so far that explore the limits of 12x12 square. The levels are not hard at all. However I am staying open to any suggestions and/or improvements that might help make the level more interesting and/or difficult!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Barona.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Beijing Olympics', '2005-10-02', 35, 'Eduardo Santos', 'Beijing Olympics', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Beijing_Olympics.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Big Ben', '2013-10-13', 24, 'Milan Vukosavljevic', 'Big Ben levels', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Big_Ben.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Birthday', '2014-03-08', 200, 'Alberto García', 'Birthday collection by Alberto Garcia', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Birthday.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Blazz', '2009-06-21', 18, 'Blaz Nikolic', 'Hope you will enjoy playing my levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Blazz.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Blazz2', '2010-05-18', 17, 'Blaz Nikolic', 'My 2nd level set :)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Blazz2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Blocks', '2014-04-12', 10, 'Dries de Clercq', 'Blocks collection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Blocks.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Boxxle 1', '2010-05-26', 108, 'Thinking Rabbit', 'Levels from the Game Boy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Boxxle1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Boxxle 2', '2010-05-26', 120, 'Thinking Rabbit', 'Levels from the Game Boy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Boxxle2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Brainsport', '2005-10-02', 1, 'Ian Hammond', 'Easy Level From Brainsport, Sokoban Clone or was that Brainstorm, I forgot the other levels if anyone remembers the orginals please email me.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Ian01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bravo Premysil Zika', '2012-01-24', 10, 'Eric F Tchong', 'My tribute to level 233 of Premysil Zika. Here 10 variations. Enjoy!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bravo_Premysil_Zika.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Brian Kent\'s Sokoban2K', '2005-10-02', 50, 'Brian Kent', 'This collection is from Brian Kent\'s Sokoban 2K', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=aenigma.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bruno Druille', '2012-09-16', 27, 'Bruno Druille', 'Level collection by Bruno Druille', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bruno_Druille.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs collection', '2010-11-28', 81, 'Buddy Casamis', 'Bugs collection by Buddy Casamis from Philippines', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=bugoy1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs Collection 138', '2005-10-02', 136, 'Buddy Casamis', 'Bugs collections Enjoy and greetings from Philippines.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bugs138.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs collection 2', '2005-10-02', 98, 'Buddy Casamis', 'Bugs collection 2 by Buddy Casamis from Philippines', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bugs2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs collection 3', '2010-11-16', 112, 'Buddy Casamis', 'Bugs collection 3 by Buddy Casamis from Philippines', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bugs3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs Collection 97', '2005-10-02', 93, 'Buddy Casamis', 'bugs collections Enjoy and greetings from Philippines.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bugs97.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs special collection', '2005-10-02', 66, 'Buddy Casamis', 'Hello to all Sokoban Lovers.I\'m an avid player of this mind games.to date I have more than 8,000 levels all with solutions.It\'s like a medicine whenever I solve some levels with much difficulty.It took me sometimes, days before I solve it.If your interested in obtaining solutions to some levels you can e-mail me together with a copy of the levels you want to be solve.I would recommend to use the ysokoban program because it is much easier to use and besides less tiring for your hands because all you need to use is your mouse keys just click the box and the destination and presto! it will go there to the shortest possible route.besides you will be able to save your solutions and go back to it in case you are wondering how you will be able to solve it.I have gone also to some sokoban solutions site but the one that I\'m most interested to solve are not in their database.I even downloaded some sokoban solver program but to my dismay some failed to solve them even those that are easiest.So I make it a challenge that those level which these solver were\'nt able to solve.I try to solve it myself.I get the feeling that If I solve some levels which the computer failed to solve.I feel like superior to the computer.So now here\'s your chance to solve that nagging levels which even in your sleep still lingering in your mind.You can contact me at this number 00639054446676 .I will give you my full support 24 hours a day.I even convert levels from other sokoban games into txt or xsb format.Pls specify which format you like to send to you.thank you.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=BugsSpecial.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs1005 collections', '2010-08-04', 995, 'Buddy Casamis', 'Hello to all Sokoban Lovers.I\'m an avid player of this mind games.to date I have more than 8,000 levels all with solutions.It\'s like a medicine whenever I solve some levels with much difficulty.It took me sometimes, days before I solve it.If your interested in obtaining solutions to some levels you can e-mail me together with a copy of the levels you want to be solve.I would recommend to use the ysokoban program because it is much easier to use and besides less tiring for your hands because all you need to use is your mouse keys just click the box and the destination and presto! it will go there to the shortest possible route.besides you will be able to save your solutions and go back to it in case you are wondering how you will be able to solve it.I have gone also to some sokoban solutions site but the one that I\'m most interested to solve are not in their database.I even downloaded some sokoban solver program but to my dismay some failed to solve them even those that are easiest.So I make it a challenge that those level which these solver were\'nt able to solve.I try to solve it myself.I get the feeling that If I solve some levels which the computer failed to solve.I feel like superior to the computer.So now here\'s your chance to solve that nagging levels which even in your sleep still lingering in your mind.You can contact me at this number 00639054446676 .I will give you my full support 24 hours a day.I even convert levels from other sokoban games into txt or xsb format.Pls specify which format you like to send to you.thank you.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bugs1005.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs509 collection', '2005-10-02', 493, 'Buddy Casamis', 'Hello to all Sokoban Lovers.I\'m an avid player of this mind games.to date I have more than 8,000 levels all with solutions.It\'s like a medicine whenever I solve some levels with much difficulty.It took me sometimes, days before I solve it.If your interested in obtaining solutions to some levels you can e-mail me together with a copy of the levels you want to be solve.I would recommend to use the ysokoban program because it is much easier to use and besides less tiring for your hands because all you need to use is your mouse keys just click the box and the destination and presto! it will go there to the shortest possible route.besides you will be able to save your solutions and go back to it in case you are wondering how you will be able to solve it.I have gone also to some sokoban solutions site but the one that I\'m most interested to solve are not in their database.I even downloaded some sokoban solver program but to my dismay some failed to solve them even those that are easiest.So I make it a challenge that those level which these solver were\'nt able to solve.I try to solve it myself.I get the feeling that If I solve some levels which the computer failed to solve.I feel like superior to the computer.So now here\'s your chance to solve that nagging levels which even in your sleep still lingering in your mind.You can contact me at this number 00639054446676 .I will give you my full support 24 hours a day.I even convert levels from other sokoban games into txt or xsb format.Pls specify which format you like to send to you.thank you.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bugs509.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Bugs550 collection', '2005-10-02', 506, 'Buddy Casamis', 'Hello to all Sokoban Lovers.I\'m an avid player of this mind games.to date I have more than 8,000 levels all with solutions.It\'s like a medicine whenever I solve some levels with much difficulty.It took me sometimes, days before I solve it.If your interested in obtaining solutions to some levels you can e-mail me together with a copy of the levels you want to be solve.I would recommend to use the ysokoban program because it is much easier to use and besides less tiring for your hands because all you need to use is your mouse keys just click the box and the destination and presto! it will go there to the shortest possible route.besides you will be able to save your solutions and go back to it in case you are wondering how you will be able to solve it.I have gone also to some sokoban solutions site but the one that I\'m most interested to solve are not in their database.I even downloaded some sokoban solver program but to my dismay some failed to solve them even those that are easiest.So I make it a challenge that those level which these solver were\'nt able to solve.I try to solve it myself.I get the feeling that If I solve some levels which the computer failed to solve.I feel like superior to the computer.So now here\'s your chance to solve that nagging levels which even in your sleep still lingering in your mind.You can contact me at this number 00639054446676 .I will give you my full support 24 hours a day.I even convert levels from other sokoban games into txt or xsb format.Pls specify which format you like to send to you.thank you.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Bugs550.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'C-Soko', '2013-07-19', 51, 'MB', 'C-Soko level collection (Collection license: WTFPL [http://www.wtfpl.net/txt/copying/])', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Csoko.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cadushi', '2017-12-13', 34, 'Eric F Tchong', 'After some years a new set from Aruba. Cadushi means cactus. Level 15 removed.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cadushi.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Calx', '2005-10-02', 25, 'Thomas Reinke', 'Handmade levels. This is a pretty hard level set.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Calx.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cargo Bay Deluxe', '2010-05-18', 60, 'MVP Software', '60 levels by MVP Software', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cargo_Bay.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cer', '2013-05-30', 35, 'Zivojin Trifunovic', 'Cer collection by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cer.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chaotic Catalysts', '2014-03-09', 9, 'Razorflame', 'A set of handmade levels fashioned in my own design, based off of some of the levels found in the pack, Infinity.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chaotic_Catalysts.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Choriban Levels', '2010-11-28', 53, 'Martí Homs Caussa', 'This collection name derives from \'choripan\', an spanish word that means \'sandwich of sausage\'. This collection includes two subsets called \'chorimalism\' (7) and \'susi\' (10). The \'chorimalism\' subset (that is, minimal levels for Choriban collection) is composed by levels of 2 boxes, and the subcollection called \'susi\' is formed by levels of small dimensions, experimenting with different number of boxes, from 2 to 7. The rest of the levels have a small size, normally with 3 boxes. Finally, the last two levels are based in David W. Skinner\'s \'Microban 60\', that I have called \'stack-machines\'.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Choriban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection', '2012-02-19', 50, 'David Buchweitz', 'A collection of 50 puzzles taken from my creations in the members section of letslogic.com - roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=chrysalis_collection.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 10', '2017-04-25', 50, 'David Buchweitz', 'The 10th collection of 50 puzzles taken from my creations in the members section of letslogic.com roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Collection_10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 2', '2012-03-06', 50, 'David Buchweitz', 'The 2nd collection of 50 puzzles taken from my creations in the members section of letslogic.com - roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 3', '2012-04-07', 50, 'David Buchweitz', 'The 3rd collection of 50 puzzles taken from my creations in the members section of letslogic.com - roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 4', '2012-06-03', 50, 'David Buchweitz', 'The 4th collection of 50 puzzles taken from my creations in the members section of letslogic.com - roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 5', '2014-03-25', 50, 'David Buchweitz', 'The 5th collection of 50 puzzles taken from my creations in the members section of letslogic.com - roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Collection_5.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 6', '2014-03-30', 50, 'David Buchweitz', 'A collection of 50 puzzles taken from my creations in the members section of letslogic.com - roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Collection_6.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 7', '2014-04-03', 50, 'David Buchweitz', 'A collection of 50 puzzles taken from my creations in the members section of letslogic.com - roughly in order of publish date.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Collection_7.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 8', '2014-04-05', 50, 'David Buchweitz', 'Chrysalis Collection 8 by David Buchweitz', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Collection_8.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Collection 9', '2014-04-13', 50, 'David Buchweitz', 'Chrysalis Collection 9 by David Buchweitz', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Collection_9.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Variations 01', '2014-03-14', 70, 'Jordi Doménech', 'Chrysalis variations; Authors: David Buchweitz and Jordi Domenech Email: jd_sokoban@abelmartin.com Website: - David Buchweitz: http://www.letslogic.com - Jordi Domenech: http://www.abelmartin.com/rj/sokoban.html Date: July 2012 Author\'s note: David Buchweitz has a great ability to create very imaginative structures. As the structure is the most important thing a puzzle, it is sometimes possible to obtain very good and amazing puzzles. These variations are modifications of some of his puzzles. For years, David Buchweitz keeps animated his website Let\'s Logic (www.letslogic.com), in which he posted his puzzles in the Member Puzzles section. - J.D. These levels are copyright (c) by David Buchweitz and Jordi Domenech and may be freely distributed for non-commercial use provided they remain unchanged, credited with the author\'s name, and provided the author is notified.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Variations_01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chrysalis Variations 02', '2014-03-18', 29, 'Jordi Doménech', 'Chrysalis variations 2 Authors: David Buchweitz and Jordi Domenech Email: jd_sokoban@abelmartin.com Website: - David Buchweitz: http://www.letslogic.com - Jordi Domenech: http://www.abelmartin.com/rj/sokoban.html Date: August 2013 Author\'s note: David Buchweitz has a great ability to create very imaginative structures. As the structure is the most important thing a puzzle, it is sometimes possible to obtain very good and amazing puzzles. These variations are modifications of some of his puzzles. For years, David Buchweitz keeps animated his website Let\'s Logic (www.letslogic.com), in which he posted his puzzles in the Member Puzzles section. - J.D. These levels are copyright (c) by David Buchweitz and Jordi Domenech and may be freely distributed for non-commercial use provided they remain unchanged, credited with the author\'s name, and provided the author is notified.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chrysalis_Variations_02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi 11', '2010-07-01', 50, 'Eric F Tchong', 'Dedicated to Jordi Domenech & remodelers from China, Japan, Europe.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi11.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi 12', '2010-10-28', 50, 'Eric F Tchong', 'Chuchubi 12 last set for this year. Enjoy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi12.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi 13', '2011-05-16', 50, 'Eric F Tchong', '50 new levels for your enjoyment.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi13.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi 14', '2011-07-02', 50, 'Eric F Tchong', '50 new chuchubi\'s', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi14.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi 15', '2011-12-28', 50, 'Eric F Tchong', 'Last chuchubi level. Happy 2012.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi15.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi01', '2005-10-02', 100, 'Eric F Tchong', 'Chuchubi is a beautiful singing bird from Aruba. This new series in honor of this singing bird. Enjoy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi02', '2005-10-02', 100, 'Eric F Tchong', 'More chuchubi\'s. Singing birds from Aruba', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi03', '2005-10-02', 100, 'Eric F Tchong', '100 new chuchubi levels to enjoy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi03.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi04', '2005-10-02', 100, 'Eric F Tchong', 'Enjoy new 100 levels in chuchubi04 set.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi04.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi05', '2005-10-02', 100, 'Eric F Tchong', '100 new levels for the Xmas and New Year season. Enjoy!!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi05.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi06', '2009-06-21', 50, 'Eric F Tchong', '50 new levels. Enjoy!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi06.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi07', '2010-05-18', 50, 'Eric F Tchong', '50 new chuchubi levels from Aruba. Enjoy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi07.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi08', '2009-12-07', 50, 'Eric F Tchong', '50 new to enjoy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi08.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi09', '2010-01-12', 50, 'Eric F Tchong', 'New levels for New Year 2010. Enjoy!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi09.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Chuchubi10', '2010-05-12', 50, 'Eric F Tchong', 'New 50 chuchubi\'s from Aruba.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Chuchubi10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Compact Catalysts', '2014-04-10', 140, 'Razorflame', 'These puzzles are small hand-made puzzles that are made with the design and difficulty in mind.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Compact_Catalysts.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Compact Catalysts 02', '2014-05-08', 152, 'Razorflame', 'These puzzles are small hand-made puzzles that are made with the design and difficulty in mind.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Compact_Catalysts_02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac', '2005-10-02', 36, 'Eric F Tchong', 'Unique serie in rememberance of my very first homebuilt COSMAC Elf computer.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 10', '2005-10-02', 50, 'Eric F Tchong', 'Final level of the Cosmac series.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 2', '2005-10-02', 100, 'Eric F Tchong', 'Here are 100 levels Cosmac2 series, Enjoy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 3', '2005-10-02', 50, 'Eric F Tchong', 'Cosmac3: 50 levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 4', '2005-10-02', 100, 'Eric F Tchong', 'Cosmac4: 100 levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 5', '2005-10-02', 75, 'Eric F Tchong', 'Cosmac5: 75 levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac5.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 6', '2005-10-02', 55, 'Eric F Tchong', 'New levels from Aruba. Enjoy!!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac6.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 7', '2005-10-02', 40, 'Eric F Tchong', '40 new levels from Aruba. Enjoy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac7.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 8', '2005-10-02', 61, 'Eric F Tchong', 'New levels', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac8.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmac 9', '2005-10-02', 50, 'Eric F Tchong', 'Cosmac no.9 50 levels', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmac9.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmonotes', '2010-08-03', 20, 'Aymeric du Peloux', 'Cosmonotes by Aymeric du Peloux', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmonotes.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cosmopoly', '2010-08-03', 19, 'Aymeric du Peloux', 'Aymeric du Peloux', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Cosmopoly.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Cubes & Tubes', '2005-10-02', 20, 'Doreen Kaufmann', 'This is our second collection of Sokoban Levels. Have fun playing, D&R.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=dur02cnt.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'David W. Skinner Arranged', '2014-03-01', 366, 'David W Skinner', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=David_W_Skinner_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'DD-1', '2014-03-14', 50, 'David Dahlem', 'DD-1 collection by David Dahlem', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=DD_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'DD-2', '2014-03-18', 99, 'David Dahlem', 'DD-2 collection by David Dahlem', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=DD_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Demons & Diamonds', '2005-10-02', 20, 'Doreen Kaufmann', 'This is our first collection of Sokoban levels. The theme Demons & Diamonds is inspired from the vintage Atari game of the same name. Of cause, it\'s only the pattern of goals and boxes that reminds of the game. The levels are of varying difficulty, but not too hard all in all. Have fun playing! D&R.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=dur01dnd.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'dh5', '2010-08-05', 20, 'David Holland', 'This is my latest collection. I haven\'t made puzzles for many years and forgot how many collections I had published! There is as yet no dh3 or dh4, until my next collection comes out. The levels are hand-made with solutions originally found by hand. They have varying difficulty and are in no particular order', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=dh5.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dimitri & Yorick', '2005-10-02', 61, 'Jaques Duthen', 'This is a series of simple sokoban puzzles for (my) kids.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dimitri-Yorick.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Disciple', '2010-08-09', 50, 'Crazy Monk', 'Crazy Monk is Copyright (c) 2008 by Jean-Pierre MARTEL and Matthias MEGER. These levels may be freely distributed provided they remain credited with this copyright and all commentaries. The Disciple levels range from easy to moderately difficult. They have been designed for Sokoban players who enjoy optimizing solutions. Some levels present an arranged version designed by Matthias Meger (codified changes). Those remodels are more difficult than the initial mazes. Send comments and best solutions to: sokomonk@laposte.net', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Disciple.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Drina', '2013-04-28', 68, 'Zivojin Trifunovic', 'Drina collection by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Drina.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dunav', '2013-07-07', 50, 'Zivojin Trifunovic', 'Dunav collection by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dunav.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 01', '2012-04-15', 50, 'Eric F Tchong', 'Dushi=sweet. Enjoy new series from Aruba.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 02', '2012-07-17', 52, 'Eric F Tchong', '52 new sweets for your enjoyment', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 03', '2013-12-15', 50, 'Eric F Tchong', 'Finally also here.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_03.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 04', '2013-04-08', 50, 'Eric F Tchong', 'New 50 dushi levels from Aruba.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_04.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 05', '2013-10-06', 48, 'Eric F Tchong', 'Dushi 05 levels from Aruba', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_05.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 06', '2013-12-01', 51, 'Eric F Tchong', 'Collection Dushi 06 by Eric F. Tchong', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_06.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 07', '2014-05-01', 61, 'Eric F Tchong', 'More dushi levels no.7', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_07.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 08', '2014-09-29', 50, 'Eric F Tchong', 'Dushi 08 new levels from Aruba', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_08.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 09', '2014-12-05', 54, 'Eric F Tchong', 'Enjoy dushi map for 2014.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_09.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 10', '2015-05-22', 50, 'Eric F Tchong', 'new dushi levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Dushi 11', '2017-12-13', 50, 'Eric F Tchong', 'Dushi 11 Enjoy!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Dushi_11.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Eric F. Tchong Arranged', '2014-03-01', 180, 'Eric F Tchong', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Eric_F_Tchong_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Erika', '2013-05-18', 1, 'Schindler Zoltán', 'I know, to solve this is very easy. But the target was for me, to create this to make a little memory of my beloved girlfriend, who died in the saddest day of my life, 2013 may 14th. Dear ERIKA ! I WILL LOVE YOU ALWAYS !!!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Erika.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Erim Sever Collection', '2005-10-02', 273, 'Erim Sever', 'These levels are copyright Erim Sever', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Erim.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Escapology', '2015-01-27', 15, 'niwa', '15 start with end position levels. Note: Houdini V is based on PicoKosmos 17 by Aymeric du Peloux', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Escapology.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Essai', '2010-05-18', 7, 'Sylvie from France', 'Novice levels realised by a novice player (Sylvie from France)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Essai.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Faux pas', '2010-05-18', 1, 'Pat Perrodon', 'Mon premier level. Not so easy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Faux_pas.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Fibonacci Challenge', '2015-03-30', 26, 'Kevin Cassol', 'A wacky style of playing sokoban: by managing LURD solutions. You can find the Golden Ratio (phi=1,618...) by dividing the number of moves of a level by the moves of the previous level. The higher n can reach, closer to phi the ratio comes. The same happens to pushes, box lines, box changes, pushing sessions and player lines. See how close to the 30-box level you can get solved!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Fibonacci_Challenge.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Fiery Catalysts', '2014-03-09', 3, 'Razorflame', 'Fiery Catalysts collection by Razorflame', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Fiery_Catalysts.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Five Brothers', '2013-06-22', 5, 'Dries de Clercq, Marko Dzekic', 'This set contains five remodels from Dries de Clercq. The levels are orimaze based. The third and fifth level will test the genius in you.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Five_Brothers.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Flatland', '2010-05-18', 20, 'Edwin Abbot', 'Enjoy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Flatland.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Fly', '2010-05-18', 3, 'Tim LeFevre', 'Simple Microban-style levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Fly.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Fontana', '2013-02-23', 31, 'Zivojin Trifunovic', 'The Fontana collection by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Fontana.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Frantisek Pokorny collection', '2010-08-03', 103, 'Frantisek Pokorny', 'These levels are copyright Frantisek Pokorny', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=fpok.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Funny Template Levels', '2010-11-24', 99, 'Martí Homs Caussa', 'This is a collection of levels designed purely with templates. Some maps are difficult, some sound simple, but they all are graceful, compact and entertaining.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Funny_Templates.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Gabi & Jenny', '2011-03-04', 5, 'Gabi Hanisch', 'These Levels are not too hard. I`ll hope you like it. Have fun. Greetings from Germany', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=GabyJenny.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Gate', '2014-03-14', 4, 'Dries de Clercq', 'Gate collection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Gate.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Ghislain Martin Arranged', '2014-03-02', 90, 'Ghislain Martin', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Ghislain_Martin_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grig Challenge Variation', '2005-10-02', 50, 'Buddy Casamis', 'Buddy Casamis Grigchallenge variations of Evgeny Grigoriev level', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=GrigChallengeVariation.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr 2001', '2005-10-02', 100, 'Evgeniy Grigoriev', 'My name is Evgeniy Grigoriev. I live in Russia, in the city of Cheboksary.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=grigr2001.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr 2002', '2005-10-02', 40, 'Evgeniy Grigoriev', 'My name is Evgeniy Grigoriev. I live in Russia, in the city of Cheboksary.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=grigr2002.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr Challenge', '2005-10-02', 5, 'Evgeniy Grigoriev', 'Grigr Challenge.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Grigr_Challenge.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr Challenge 3', '2016-01-18', 6, 'Grigr', '', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=GrigrChallenge_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr Challenge Remodeled', '2005-10-02', 6, 'Vipul Patel', 'This is remodeled version of Evgeny Grigoriev\'s Grigr Challenge collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Challenge_Remodeled.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr Comet', '2009-12-22', 30, 'Evgeniy Grigoriev', 'Small and beautiful levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Grigr_Comet.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr Special', '2005-10-02', 40, 'Evgeniy Grigoriev', 'Grigr Special.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Grigr_Special.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr Star', '2009-12-22', 30, 'Evgeniy Grigoriev', 'Small and beautiful levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Grigr_Star.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Grigr Sun', '2009-12-28', 10, 'Evgeny Grigoriev', 'Small and beautiful levels', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Grigr_Sun.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Gucevo', '2013-02-15', 28, 'Zivojin Trifunovic', 'Gucevo collection by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Gucevo.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Guichard', '2014-04-12', 46, 'Guichard', 'Date of Last Change: 2005-11-06 01:59:47', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Guichard.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Gyjgw Arranged', '2014-03-02', 49, 'Gyjgw', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Gyjgw_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Gyjgw Collection', '2014-03-16', 295, 'Gyjgw', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Mark (merging of initial collections, renaming the new collection, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Gyjgw_Collection.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Help', '2013-05-18', 10, 'Milutin Negovanovic', 'Help collection by Milutin Negovanovic.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Help.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Homz Levels', '2010-11-24', 200, 'Martí Homs Caussa', 'Homz\'s Sokoban Level Collection 2007, designed by Marti Homs (homz70@gmail.com). More than 200 levels, automatically generated in different ways. Contains some easy handmade levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=HomzLevels.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Homz Levels Part II', '2010-11-28', 49, 'Martí Homs Caussa', 'Churros-Like Generated Levels designed by Marti Homs (homz70@gmail.com)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Churros.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Howard Levels 1', '2005-10-02', 100, 'Howard Abed', 'Howard 1 level set, created by Howard Abed.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=howard1text.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Howard\'s Fourth Set', '2005-10-02', 32, 'Howard Abed', 'This set contains edited versions of some of the standard levels. Howard has deleted unnecessary space and added more boxes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=howard4text.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Howard\'s Second Set', '2005-10-02', 40, 'Howard Abed', 'In this set, there is just one box out of place on each level.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=howard2text.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Howard\'s Third Set', '2005-10-02', 40, 'Howard Abed', 'These levels all have 4 boxes to move and aren\'t very difficult.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=howard3text.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Initial Trouble', '2005-10-02', 12, 'Andre Bernier', 'Family initials which are hard and harder', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=ALDMGR.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Initiation', '2014-02-16', 1, 'Carlos Montiers', 'Initiation by Carlos Montiers', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Initiation.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Ionic Catalysts', '2013-12-22', 1205, 'Razorflame', 'This is the first of many collections of levels that I solved by hand and generated. They are all fairly easy. Enjoy!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Ionic_Catalysts.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'jcd levels', '2005-10-02', 17, 'John C Davis', 'There are two different ways of playing Level 2. The first is the normal way, moving any ball anywhere at any time. The second way, which is more interesting and difficult, and the way it was designed to be played, is treating it as eight levels in one. Each letter of SOKOBAN! must be completed before the next is started, using only the balls arranged below each letter in the shape of that letter. These can be put into the letter goals in any order. While doing any letter all the other balls must be considered locked, becoming walls. After any letter is finished, the balls used for that letter become locked and the ones in the following letter become unlocked. Your target is 635 moves (or better!). Instead of doing Level 2 this way as one big level, you can do it as eight separate levels using levels 3 - 10 to progress automatically. In these the locked balls are walls and the goals for other letters are floor. This looks a bit peculiar, but the playability is correct. Note that the start position for the man for each letter is the end position for one way of doing the previous letter. You might have done it a different way.... When you\'ve finished all eight letters, you\'ve earned the right to do the one-push small reward level, where all the balls are shown in their goals, looking normal again. The last few levels are joke levels, mostly needing just two clicks to solve. Hey, let the program do the work!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=jcd.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Jean-Pierre Kent', '2010-08-05', 75, 'Jean-Pierre Kent', 'Collection of 75 levels by Jean-Pierre Kent.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Jean_Pierre_Kent.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Joke', '2010-05-18', 4, 'Perka', 'Just a joke...', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Perka.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kalle1', '2005-10-02', 12, 'Karl-Heinz Böhm', 'Kalle1 level collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=kalleb1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'KEAS Collection', '2005-10-02', 26, 'Keijo Sopuli', 'All levels are made with Björn\'s Sokoban for Windows level editor. I think that averagely they are near medium difficulty. Levels are guite big so there is plenty of room to wander...', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kepez.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kenyam Set A', '2010-08-04', 45, 'Kenya Maruyama', 'The Kenyam Set A collection', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kenya_Maruyama.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 01', '2012-09-17', 100, 'Kevin B Reilly', 'Collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 02', '2012-09-19', 100, 'Kevin B Reilly', 'Collection 02 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 03', '2012-09-20', 100, 'Kevin B Reilly', 'Collection 03 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_03.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 04', '2012-09-22', 100, 'Kevin B Reilly', 'Collection 04 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_04.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 05', '2012-09-24', 100, 'Kevin B Reilly', 'Collection 05 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_05.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 06', '2012-09-27', 100, 'Kevin B Reilly', 'Collection 06 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_06.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 07', '2012-10-15', 100, 'Kevin B Reilly', 'Collection 07 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_07.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 08', '2012-10-19', 100, 'Kevin B Reilly', 'Collection 08 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_08.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 09', '2012-11-27', 100, 'Kevin B Reilly', 'Collection 09 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_09.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 10', '2014-02-04', 100, 'Kevin B Reilly', 'Collection 10 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 11', '2014-02-04', 100, 'Kevin B Reilly', 'Collection 11 by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_11.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 12', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 12 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_12.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 13', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 13 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_13.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 14', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 14 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_14.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 15', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 15 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_15.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 16', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 16 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_16.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 17', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 17 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_17.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 18', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 18 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_18.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 19', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 19 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_19.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 20', '2014-02-25', 100, 'Kevin B Reilly', 'Kevin 20 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_20.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin 21', '2014-02-25', 53, 'Kevin B Reilly', 'Kevin 21 collection by Kevin B Reilly', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_21.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kevin B. Reilly Arranged', '2014-03-02', 162, 'Kevin B Reilly', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kevin_B_Reilly_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kisser', '2005-10-02', 4, 'Kirill', 'Nothing special it\'s my first level.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=kisser.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kobus Theron collection', '2005-10-02', 107, 'Kobus Theron', 'These levels are copyright Kobus Theron', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Jct.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kokoban', '2005-10-02', 41, 'François Marques', 'I place in this collection, the levels which cannot be in the other packages of levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kokoban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kurt Nittel 1', '2014-04-13', 90, 'Kurt Nittel', 'Kurt Nittel 1 collection by Kurt Nittel', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kurt_Nittel_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Kurt Nittel 2', '2014-04-17', 100, 'Kurt Nittel', 'Kurt Nittel 2 collection by Kurt Nittel', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Kurt_Nittel_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'La Golondrina 01', '2012-02-08', 12, 'Eric F Tchong', 'A dozen golondrina\'s fun play', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=la_golondrina_01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Laizhufu and LZY Arranged', '2014-03-02', 104, 'Laizhufu, LZY', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Laizhufu_LZY_Arr.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Learning Sokoban', '2010-05-18', 37, 'Draku', '38 levels from very easy to hard. I\'m a 30 years-old boy from Spain. Enjoy my levels!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Learning_Sokoban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Lexical Catalysts', '2014-03-06', 2, 'Razorflame', 'This series of puzzles consists of puzzles that are words, names (both first and last), and places, all designed with my own personal flair and also designed with the difficulty of the puzzle in mind.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Lexical_Catalysts.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Li Jin You Collection', '2014-03-20', 361, 'Li Jin You', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Mark (extracting actual levels by Li Jin You from a much bigger collection of levels by other authors, removing the duplicates, removing usolvable levels, forming a new collection composition in general, coauthor of some remodels).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Li_Jin_You.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Lined', '2014-04-13', 37, 'Dries de Clercq', 'Lined ollection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Lined.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Loma', '2010-05-18', 60, 'Many Authors, see each level', 'Levels Of Multi Authors collected by Aymeric du Peloux.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Loma.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Longevity', '2014-03-11', 6, 'Razorflame', 'A collection of levels that take a while to solve that were designed with the design and difficulty of the levels in mind. Please note that these levels WILL take you a while to solve!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Longevity.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'MacTommy inventions', '2014-03-02', 50, 'MacTommy', 'The MacTommy inventions collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=MacTommy_inventions.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Magic Pearls', '2014-03-08', 100, 'Ward De Langhe', 'Magic Pearls collection by Ward de Langhe', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Magic_Pearls.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Many Boxes', '2012-01-25', 6, 'Reinhard Hielscher', 'Many Boxes by Reinhard Hielscher', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Many_Boxes.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Maps After All', '2010-11-24', 125, 'Martí Homs Caussa', 'The first 68 rookie-levels have 2 boxes, the remaining ones bring 3 boxes, but without to increase too much its difficulty. Composed by patterns. Ed: Removed many duplicates.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Maps_after_all.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mario Bonenfant collection', '2005-10-02', 30, 'Mario Bonenfant', 'All levels are presented in chronological order. The levels were designed using Sokofun Pro\'s editor function. Thanks to : Mic (Germany)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=MarioB.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mass Remodel', '2014-04-03', 2304, 'Many Authors, see each level', 'The levels in this set were collected, documented and published by Sokoplaza members. Initial supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates). Additional supervisor: Mark (merging of reviewed collections into one big collection, renaming the new collection, removing duplicates equal to conjunction remodel sets).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mass_Remodel.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Master Head', '2010-05-18', 45, 'Union Software of Silesia', 'Levels from Master Head - Polish Atari XL/XE game', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=MasterHead.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mastervip', '2005-10-02', 66, 'Vipul Patel', 'This is my first set.Many of them have solution close to one lac moves. But all are solvable either in one lac or less moves. Thanks.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mastervip.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Maximum 100,000 moves', '2005-10-02', 15, 'Vipul Patel', 'Maximum 100000 moves allowed in each level', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Maximum_100000_moves.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'MF8 Sokoban Competition', '2011-06-14', 16, 'MF8: Many authors', 'MF8 Sokoban Competition: The MF8 forum is a forum for all twisty puzzles. (i.e. Rubik\'s Cube) In 2009, a sub-forum is created for Sokoban enthusiasts. The 1st Sokoban competition took place on April 7, 2009. There is a Sokoban competition about every month. Everyone is free to join. Winners of the competition will get a twisty cube. See this page for more details: http://sokoutil.orgfree.com/competition.html Due to the simplicity of the first three competition levels, they are omitted from this set. Authors: (not in any particular order) stopheart, anian, Yang Chao, gyjgw, York Shen, Kevin B. Reilly, Jean-Pierre Martel, Matthias Meger, Jordi Doménech, Thinking Rabbit.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=MF8.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Micro Cosmos', '2005-10-02', 40, 'Aymeric du Peloux', 'The 17 first levels were published on Visual Sokoban in 1999. During the year 2000, some web sites accepted to publish the 20 first levels. Finally, I stopped at 40 levels. This set contains 5 levels 3boxes, 26 levels 4boxes, 6 levels 5boxes and 3 levels 6boxes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=MicroCosmos.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Microban', '2005-10-02', 155, 'David W Skinner', 'Microban (155 puzzles, revised April, 2000) This is a good set for beginners and children. Most of the puzzles are small and illustrate a particular concept. More experienced players should also find them interesting, since they are as different from each other as I could make them given their size. Sokoholics could perhaps time themselves on completing the whole set. This set also contains puzzles which I thought were interesting but too easy to include in my regular sets.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=microban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Microban 01 Arranged', '2014-03-30', 3, 'York Shen', 'Arrangements of David W. Skinner\'s levels They are published with David W. Skinner\'s permission original level page: http://users.bentonrea.com/~sasquatch/sokoban/', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Microban_01_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Microban 02 Arranged', '2014-04-03', 11, 'York Shen', 'Arrangements of David W. Skinner\'s levels They are published with David W. Skinner\'s permission original level page: http://users.bentonrea.com/~sasquatch/sokoban/', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Microban_02_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Microban II', '2010-02-19', 135, 'David W Skinner', 'Microban II (135 puzzles released April, 2002) Like Microban, this set is for beginners and children. Most of the puzzles are small and illustrate a particular concept. At the end of the set are four mega puzzles which are fun to watch on programs which can handle oversize levels and allow automated extended pushes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=masmicroban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Microban III', '2010-02-19', 101, 'David W Skinner', 'In addition to new Microban puzzles, this set incorporates those which I had created for Aymeric Du Peloux\'s LOMA project. For more info see Aymeric\'s LOMA page. One mega puzzle is at the end of the set.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Microban_III.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Microban IV', '2011-01-13', 102, 'David W Skinner', 'Microban IV (102 puzzles, August 2010) This set includes a series of alphabet puzzles.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Microban_IV.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mill', '2014-03-17', 1, 'Dries de Clercq', 'Mill by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mill.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mill Remodel', '2014-03-21', 5, 'Dries de Clercq, Mark, anian', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Mark (general supervisor and author, coauthored by Anian, original Mill level by Dries de Clercq).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mill_Remodel.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mini Cosmos', '2005-10-02', 40, 'Aymeric du Peloux', 'This set is inpired from the sets Microcosmos and Nabokosmos. I created it for people who never played Sokoban before. This set contains some twin levels which allow you to learn progressively this game by adding a box. An expert should solve it in less than one hour. This set contains 2 levels 1box, 16 levels 2boxes and 22 levels 3boxes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=MiniCosmos.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mitija', '2012-03-06', 20, 'Milutin Negovanovic', ':)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mitija.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mitija 1', '2012-04-02', 40, 'Milutin Negovanovic', 'Mitija 1, collection by Milutin Negovanovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mitija_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mitija 2', '2012-12-18', 50, 'Milutin Negovanovic', 'Pour mes élèves en mathématiques.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mitija_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mitija 3', '2013-01-14', 16, 'Milutin Negovanovic', 'Mitija 3 collection by Milutin Negovanovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mitija_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mitija 4', '2013-04-19', 40, 'Milutin Negovanovic', 'Mitija 4 collection by Milutin Negovanovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mitija_4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Monde', '2010-08-03', 266, 'Ghislain Martin', 'Level collection by Ghislain Martin', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Monde.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Monry and Panda Arranged', '2014-03-21', 118, 'monry, Panda', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Monry_Panda_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Monry Collection', '2014-03-10', 339, 'monry', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Mark (merging of initial collections, renaming the new collection, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Monry_Collection.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Monster Sokoban', '2014-03-08', 56, 'Hirohiko Nakamiya', 'Monster Sokoban collection by Hirohiko Nakamiya', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Monster_Sokoban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'More Bugs collections', '2005-10-02', 737, 'Buddy Casamis', 'Hello to all Sokoban Lovers.I\'m an avid player of this mind games.to date I have more than 8,000 levels all with solutions.It\'s like a medicine whenever I solve some levels with much difficulty.It took me sometimes, days before I solve it.If your interested in obtaining solutions to some levels you can e-mail me together with a copy of the levels you want to be solve.I would recommend to use the ysokoban program because it is much easier to use and besides less tiring for your hands because all you need to use is your mouse keys just click the box and the destination and presto! it will go there to the shortest possible route.besides you will be able to save your solutions and go back to it in case you are wondering how you will be able to solve it.I have gone also to some sokoban solutions site but the one that I\'m most interested to solve are not in their database.I even downloaded some sokoban solver program but to my dismay some failed to solve them even those that are easiest.So I make it a challenge that those level which these solver were\'nt able to solve.I try to solve it myself.I get the feeling that If I solve some levels which the computer failed to solve.I feel like superior to the computer.So now here\'s your chance to solve that nagging levels which even in your sleep still lingering in your mind.You can contact me at this number 00639054446676 .I will give you my full support 24 hours a day.I even convert levels from other sokoban games into txt or xsb format.Pls specify which format you like to send to you.thank you.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=MoreBugs.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'More Magic Pearls', '2014-03-13', 15, 'Ward De Langhe', 'More Magic Pearls', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=More_Magic_Pearls.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mulholland 2', '2005-10-02', 73, 'Shaggath', 'Levels by Shaggath & Yasgen', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mulholland_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Mulholland D', '2005-10-02', 57, 'Shaggath', 'Levels by Shaggath', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Mulholland_D.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Myriocosmos', '2010-08-03', 13, 'Aymeric du Peloux', 'Myriocosmos by Aymeric du Peloux', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Myriocosmos.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Nabo Cosmos', '2005-10-02', 40, 'Aymeric du Peloux', 'This set was published progressively on the site of Paul Voyer, Gerald Holler and Frantisek Pokorny. I wanted this set more difficult than Microcosmos, but still with small levels. And why Nabokosmos ? Read backwards Som(e)sokoban;-) This set contains 2 levels 3boxes, 8 levels 4boxes, 21 levels 5boxes, 7 levels 6boxes and 2 levels 7boxes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=NaboCosmos.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Nakamiya', '2012-09-20', 10, 'Hirohiko Nakamiya', 'Collection by Hirohiko Nakamiya', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Nakamiya.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Nakamiya Joy', '2012-09-19', 8, 'Hirohiko Nakamiya', 'Joy collection by Hirohiko Nakamiya', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Nakamiya_Joy.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Nakamiya Limit', '2012-09-22', 6, 'Hirohiko Nakamiya', 'Collection Limit by Hirohiko Nakamiya', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Nakamiya_Limit.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Nakamiya Practice', '2012-09-22', 12, 'Hirohiko Nakamiya', 'Collection Practise by Hirohiko Nakamiya', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Nakamiya_Practice.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Namo', '2017-02-27', 37, 'Vipul Patel', 'Namo collection by Vipul Patel', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Namo.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'New Year', '2014-03-20', 100, 'Alberto García', 'New Year collection by Alberto Garcia', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=New_Year.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Novoban', '2005-10-02', 50, 'François Marques', 'This collection of 50 levels is intended for beginners. The difficulty of the levels is increasing. The collection ends with some medium levels. I submitted these problems to my 10 and 14 year old nephews who completed all in one day (which is not bad at all for complete beginners). However, if you are an expert, solving the whole collection in less than 45 minutes is quite a challenge.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Novoban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Numbers', '2005-10-02', 10, 'François Marques', 'This collection consists of 10 levels: one for each digit. The difficulty of the levels varies. I think that you will be able to test them profitably.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Numbers.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Numbers by DrFogh', '2017-12-23', 12, 'DrFogh', 'First published at www.sokoban.dk Firstdate: 2016-06-20 Lastdate: 2016-08-28 These puzzles can be freely distributed. Please quote me as the original author with name, email and url. DrFogh', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Numbers_by_DrFogh.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Original & Extra', '2010-05-26', 90, 'Thinking Rabbit', 'The 50 original levels from Sokoban plus the 40 from Extra.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Original.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Original 51-90 remodeled', '2009-09-07', 40, 'Eric F Tchong', 'original 51-90 remodeled by Eric F. Tchong - Enjoy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Original_51-90_rem.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Original Extra Sharpen', '2017-12-23', 41, 'DrFogh, Archanfel, Joseph L Traub', 'Sharpened and reduced versions of all of the levels 51-90 in the collection Original Plus Extra. The levels were originally collected and/or made by Joseph Traub and others and supplied with the XSokoban player. The changes here are mostly by me (DrFogh). With lots of changes and levels added by Archanfel. More about the project at http://sokoban.dk/original-extra-sharpen/ I think nobody claims any legal rights to these levels. Please publish the collection on your site if you wish but don\'t change this information. Date_First: 2017-09-09 Date_Last: 2017-10-08 Regards DrFogh', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Original_Extra_Sharpen.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Original01', '2017-12-23', 50, 'DrFogh', '50 original puzzles arranged roughly chronologically. A few previously published variations only differing slightly from the puzzles here are omitted. Firstdate: 2013-07-31 Lastdate: 2015-11-19 The puzzles can be freely distributed. Plese quote me as the original author with name, email and url.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Original01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Original02', '2017-12-23', 50, 'DrFogh', '50 original puzzles arranged roughly chronologically. A few previously published variations only differing slightly from the puzzles here are omitted. FirstDate: 2015-11-21 LastDate: 2016-06-29 The puzzles can be freely distributed. Don\'t remodel or sharpen anything unless it is obviously good. I am the judge on that. Regards DrFogh', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Original02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Orimaze', '2014-03-10', 5, 'Dries de Clercq', 'Orimaze collection by Dries de Clercq.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Orimaze.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Orimaze 2', '2014-03-07', 3, 'Dries de Clercq', 'Orimaze 2 by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Orimaze_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Orimaze-variations', '2014-03-13', 12, 'Dries de Clercq', 'Orimaze-variations collection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Orimaze-variations.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Pacov', '2013-12-28', 33, 'Zivojin Trifunovic', 'Pacov by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Pacov.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Park', '2013-05-03', 40, 'Zivojin Trifunovic', 'Park collection by Zivojin Trifunovic Side note. Level 2 was the exact copy of Infinity level 1180 or Aerie level 10 (rotated 180 degrees and horizontally mirrored), and level 3 and 12 the remodels with practically the same solution as originals. The actual author of these levels has resubmited the collection, with these plagiat levels removed. Levels 13 to 17 are all remodels from the collection Atroxija level 11. The author of the original, from which these remodels were made, has labeled them as rem 1-5 or remodels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Park.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Passing By', '2015-07-02', 15, 'Andrej Cerjak', 'This small collection is a kind of supplement for my', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Passing_By.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Patera', '2005-10-02', 10, 'Thomas Reinke', 'A set of 10 levels with a common theme. Feel free to comment about this and other level sets at: thoms545@yahoo.com', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Patera.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Paulje', '2013-08-16', 54, 'Zivojin Trifunovic', 'Paulje collection by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Paulje.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 01', '2012-01-02', 100, 'Findus', 'Some remodels. Have fun!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 02', '2012-01-28', 100, 'Findus', 'Some remodels. Have fun!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 03', '2012-02-27', 100, 'Findus', 'Have fun!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_03.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 04', '2012-03-28', 100, 'Findus', 'Have more fun!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_04.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 05', '2012-04-29', 100, 'Findus', 'Have fun!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_05.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 06', '2012-05-29', 100, 'Findus', 'more fun', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_06.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 07', '2012-10-26', 100, 'Findus', 'Findus - Payback 07', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_07.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 08', '2012-12-06', 100, 'Findus', 'Have fun!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_08.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 09', '2012-12-19', 100, 'Findus', 'have fun!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_09.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Payback 10', '2013-01-29', 100, 'Findus', 'Have fun.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Payback_10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Perfect', '2014-03-30', 115, 'Thinking Rabbit', 'Perfect collection by Thinking Rabbit', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Perfect.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Petitesse', '2015-01-28', 18, 'niwa', '18 handmade miniature levels. Note: Little Red Rooster is a duplicate of an unpublished level by Dries De Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Petitesse.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Pico Cosmos', '2005-10-02', 20, 'Aymeric du Peloux', 'This set is the logical continuation of the sets Minicosmos-Microcosmos-Nabokosmos (It sounds like Milli-Micro-Nano-Pico !). It\'s intented to the fanatics of Sokoban. This set contains 3 levels 6boxes, 7 levels 7boxes and 10 levels 8boxes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=PicoCosmos.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Picolevels', '2010-11-24', 43, 'Martí Homs Caussa', 'All the levels have been created by Marti Homs Any possible matching of levels with those of another collection is a coincidence.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=PicoLevels.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Piramida', '2014-01-02', 22, 'Zivojin Trifunovic', 'Piramida by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Piramida.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Podrinje', '2013-05-07', 50, 'Zivojin Trifunovic', 'Podrinje collection by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Podrinje.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Puzzle', '2005-10-02', 100, 'Alberto García', 'Alberto Garcia - Puzzle', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Puzzle.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Quagmire', '2005-10-02', 50, 'Thomas Reinke', 'This is a set of 50 levels of variable difficulty. Some of them aren\'t the greatest, hence the name, Quagmire. Level #43 is a (harder?) remake of Patera level #8. Comments are always appreciated.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Quagmire.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Quagmire 2', '2011-11-24', 50, 'Thomas Reinke', 'As with the first Quagmire set, there is a wide range of difficult, although this set tends on the harder side. There are some recurring themes throughout the levels, especially my recent infatuation with nearly solved layouts.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Quagmire_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Quagmire 3', '2014-04-03', 100, 'Thomas Reinke', '100 levels of varying difficulty from easy-ish to pretty dang hard. Several years in the making, with lots of breaks. My fascination with patterns and symmetry continues, combined with a lot of nearly-solved initial states. Hope you enjoy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Quagmire_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Rdlom', '2014-03-17', 166, 'Roger Delaporte', 'Rdlom collection by Roger Delaporte', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Rdlom.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Rebus 1', '2013-05-27', 16, 'Milutin Negovanovic', 'Rebus 1 collection by Milutin Negovanovic Level 5 is a remodel from Labyrinth of Agony collection level 7. Level 11 is a remodel from Labyrinth of Agony collection level 10. Level 16 is a remodel from Labyrinth of Agony collection level 9. Labyrinth of Agony is copyrighted by Marko Dzekic also known as MD or mark. Additional edit, Level 11 correctly oriented.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Rebus_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Rectangled', '2014-04-13', 11, 'Dries de Clercq', 'Rectangled collection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Rectangled.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Red Star', '2013-07-30', 21, 'Milutin Negovanovic', 'Red Star collection by Milutin Negovanovic.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Red_Star.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Remodel Club', '2014-03-07', 107, 'Evgeny Grigoriev', 'Remodel Club by Evgeny Grigoriev Email: grigr@yandex.ru Homepage: http://grigr.narod.ru/', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Remodel_Club.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Remodeling', '2010-01-27', 27, 'Marko Dzekic', 'Remodel set by many authors, Level 1 - Li Jin You and M Dzekic (MD), Level 2 - Li Jin You and MD, Level 3 - Li Jin You and MD, Level 4 - Francois Marques and Jgw and MD, Level 5 - Francois Marques and Jgw and MD, Level 6 - Francois Marques and York Shen and Jgw and MD, Level 7 - Big Panda and MD, Level 8 - Big Panda and MD, Level 9 - Big Panda and MD, Level 10 - Big Panda and MD, Level 11 - Big Panda and MD, Level 12 - Big Panda and MD, Level 13 - Big Panda and MD, Level 14 - Big Panda and MD, Level 15 - Zhenying and MD, Level 16 - Gyjgw and Stopheart and MD, Level 17 - Unknown and MD, Level 18 - Unknown and MD, Level 19 - Unknown and MD, Level 20 - Unknown and MD, Level 21 - Unknown and MD, Level 22 - Sven Egevad and MD, Level 23 - David W Skinner and York Shen and LZY and Gyjgw and MD, Level 24 - David W Skinner and York Shen and MD, Level 25 - Jgw and MD, Level 26 - Jgw and MD, Level 27 - Dries de Clercq and MD', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Remodeling.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge', '2014-04-05', 292, 'Thinking Rabbit', 'Revenge collection by Thinking Rabbit', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 13', '2011-01-28', 50, 'Marcus Hof', 'The 13th part of the RevengeCollection-series, which from now on is named \'Revenge\' only, again is handmade (except level #41 which was generated with YASGen 1.42), tested and solvable. Level #2 and #3 are remodeled versions of Level #44 and #41 from the MasterHead-levelset. Level #26 is a remodeled version of a Sasquatch-Level by David W. Skinner. Level #39 is a remodeled version of a level by Sven Egevad. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_13.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 14', '2011-02-01', 55, 'Marcus Hof', 'Part 14 contains 55 handmade, tested and solvable puzzles. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_14.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 15', '2011-02-08', 51, 'Marcus Hof', 'Part 15 is a mixture of remodeled versions and handmade levels. Levels #1 to #5 are remodeled versions from levels of the kevin19-levelset created by Kevin B. Reilly. Level #6 is a remodeled version of level #67 from my own RevengeCollection02 which was also remodeled by Jordi Doménech. Level #27 and #28 are two remodeled versions of a puzzle originally created by Dries DeClerq. Level #31 to #33 are remodeled versions from levels of the V2010-levelset created by Shaggath. All levels have been tested and are solvable. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_15.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 16', '2011-02-15', 50, 'Marcus Hof', 'Part 16 again is handmade, tested and solvable. Level#7 is a remodeled version of Level#2 from the Blazz2-levelset, created by Blaz Nikolic. Level #16 is a variation of Level#21 from the MicrobanIV-levelset, created by David W. Skinner. Level #18 is a variation of Level#20 from the Sven04-levelset, created by Sven Egevad. Level#31 and #32 are variations of Level#1 from the MulhollandD-levelset, created by Shaggath. Level#42 is a variation from the svb495-level from Serg Belyaev. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_16.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 17', '2011-03-09', 50, 'Marcus Hof', 'Part 17 is totally handmade (except #8 which was generated), tested and solvable. Level #32 is a remodeled version of my own level #67 from \'Revenge Collection 02\' which was also remodeled by Jordi Domenech. #33 is another variation of the same level. #34 is a remodeled version of MicrobanIII-#27, originally created by David W. Skinner. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_17.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 18', '2011-03-27', 50, 'Marcus Hof', 'Part 18 is handmade, tested and solvable. #5 is a variation of level #58 from the \'Miniatures\'-levelset, copyright by Jordi Domenech. #26 is a remodeled version of level SE1190 from the \'Sven12\'-levelset, copyright by Sven Egevad. This collection is copyright by Marcus Hof. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_18.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 19', '2011-04-07', 50, 'Marcus Hof', 'Part 19 is handmade and solvable. Levels #1 to #4, #18 and #32 are variations of level #176, #177, #206, #227, #239 and #297 from the \'Sven_YASGMind\'-levelset, copyright by Sven Egevad. #34 is based on a level by Dries DeClerq. #39 is a variation of level#17 from the \'GrigoSpecial\'-levelset, created by GRIGoRusha. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_19.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 20', '2011-04-13', 50, 'Marcus Hof', 'The 20th part is handmade, tested and solvable. This collection contains just small levels, except #27 which is based on a \'Chuchubi\'-level by Eric F. Tchong. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_20.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 21', '2011-04-17', 50, 'Marcus Hof', 'Part 21 is handmade. #29 and #30 are based on level #67 from the \'Atlas02\'-levelset, created by Eric F. Tchong. #39 and #40 are inspired by levels from Dries DeClerq. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_21.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 22', '2011-05-09', 109, 'Marcus Hof', 'The 22nd part also is handmade, tested and solvable. Level #55 is a remodeled version of \'Atlas08\'-level #69, originally created by Eric F. Tchong. Level #64 is a variation of \'Aruba08\'-level #3, originally created by Eric F. Tchong. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_22.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 23', '2011-05-17', 75, 'Marcus Hof', 'Part 23 is handmade. Levels #1 and #2 are based on level #3 from the Soloban-levelset originally created by Francois Marques. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_23.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 24', '2011-05-30', 50, 'Marcus Hof', 'Part 24 is handmade, tested, solvable and easier than the parts 22 and 23. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_24.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 25', '2011-06-04', 50, 'Marcus Hof', 'The 25th part also is handmade, tested and solvable. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_25.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 26', '2011-06-20', 50, 'Marcus Hof', 'The 26th part also is handmade, tested and solvable. Level #34 is based on level #69 from the SokEvo-levelset created by Lee J. Haywood. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_26.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 27', '2011-07-03', 50, 'Marcus Hof', 'The 27th part is handmade, tested and solvable. Level #8 is a variation of #39 from the MagicSokoban-levelset by Jordi Domenech. Level #9 is a remodeled version of my own #21 from RevengeCollcetion08. Level #18 is based on the level \'Sokogravity1\' by Dries DeClerq. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_27.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 28', '2011-07-21', 50, 'Marcus Hof', 'The 28th part contains 50 handmade levels. Level #8 is based on level SE1190 by Sven Egevad. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_28.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 29', '2011-08-06', 50, 'Marcus Hof', 'The 29th part contains 50 handmade, tested and solvable levels. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_29.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 30', '2011-08-18', 50, 'Marcus Hof', 'The 30th part contains 50 handmade levels. #18 is based on level #35 from the kevin4-levelset by Kevin B. Reilly. #36 is a variation of level #64 from the kevin8-levelset by Kevin B. Reilly. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_30.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 31', '2011-09-17', 50, 'Marcus Hof', 'The 31st part contains 50 handmade levels. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_31.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 32', '2011-09-24', 50, 'Marcus Hof', 'The 32nd part contains 50 handmade levels. Level 35 is a variation of MicrobanV level 2 (from the unofficial release) orginally created by David W. Skinner. Level 48 is a variation of level Kevin1405 created by Kevin B. Reilly. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_32.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 33', '2011-10-01', 50, 'Marcus Hof', 'Part 33 contains 50 handmade levels. Level 8 is a remodeled version of level Kevin1312 created by Kevin B. Reilly. Level 31 is a remodeled version of level 4 from the dh1-levelset by David Holland. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_33.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 34', '2011-10-18', 66, 'Marcus Hof', 'Part 34 contains 66 handmade levels. Level 4 is a variation of level 26 from the KenyamSetA created by Kenya Maruyama. Level 8 is a variation of level 7 from the SasquatchX-levelset by David W. Skinner. Level 41 is based on level 2 from the SasquatchII-levelset by David W. Skinner. Level 64 is a variation of level 9 from the SasquatchVI-levelset by David W. Skinner. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_34.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 35', '2011-11-29', 50, 'Marcus Hof', 'Part 35 contains 50 handmade levels. Level 47 is a variation of level 32 from MicrobanIV created by David W. Skinner. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_35.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 36', '2012-01-23', 130, 'Marcus Hof', 'Part 36 contains 130 handmade levels. Level 37 is a variation of MicrobanII level 94, created by David W. Skinner. Level 124 is dedicated to the great sci-fi-movies Starship Troopers and Starship Troopers 3 : Marauder, created by Paul Verhoeven. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_36.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 37', '2012-02-26', 140, 'Marcus Hof', '140 new levels. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_37.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 38', '2012-05-02', 56, 'Marcus Hof', '56 new levels. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_38.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge 39', '2012-10-27', 50, 'Marcus Hof', '50 new levels. It is the last \'RevengeXX\'-collection. Thank you for playing. I hope you had fun playing and solving the puzzles. Enjoy, have fun and keep thinking as a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_39.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 01', '2010-11-24', 89, 'Marcus Hof', 'A set of 90 small levels. The difficulty ranges from easy to \'a little bit tricky\'.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 02', '2010-06-07', 76, 'Marcus Hof', 'The second part of the Revenge-Collection is a mixture of easy and medium levels. But how difficult they are for you ? That is what you must decide for yourself. But don\'t worry if you get stuck - they are all solvable and not that hard that it would take hours to find a solution. Have fun and keep thinking like a Sokoban. ;-)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 03', '2010-08-26', 105, 'Marcus Hof', 'The third part of the Revenge-Collection is a mixture of small and not too easy levels. These levels are more tricky than those in the first and second part. They are all solvable. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_03.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 04', '2010-09-16', 105, 'Marcus Hof', 'The fourth part of the Revenge-Collection. They are all solvable. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_04.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 05', '2010-09-16', 62, 'Marcus Hof', 'The fifth part of the Revenge-Collection. This set is totally handmade. They are all solvable. Enjoy, have fun and keep thinking like a sokoban/warehousekeeper. Greetings from good old Germany. Comments from other authors are welcome.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_05.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 06', '2010-09-24', 58, 'Marcus Hof', 'The sixth part of the Revenge-Collection. They are all solvable. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_06.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 07', '2010-12-06', 50, 'Marcus Hof', 'The seventh part of the Revenge-Collection. All levels are handmade and solvable. Level #20 of this collection was inspired by the \'dh1\'-level #7 from David Holland. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_07.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 08', '2010-12-08', 50, 'Marcus Hof', 'The eigth part of the Revenge-Collection. All levels are handmade and solvable. Level 45 and 46 were inspired by Microban-levels from David W. Skinner. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_08.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 09', '2010-12-10', 50, 'Marcus Hof', 'Part nine of the Revenge-Collection. Level #1 was inspired by a level from Thomas Reinke and level #2 by a remodeled level from Aymeric du Peloux and François Marques. All levels are handmade and solvable. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_09.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 10', '2010-12-10', 126, 'Marcus Hof', 'The tenth part contains 126 small levels which first had been generated with the YASGen-generator and then had been modified by hand. For sure they are all solvable. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_10.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 11', '2010-12-21', 52, 'Marcus Hof', 'The eleventh part of the Revenge-Collection again contains a series of handmade levels, which are all solvable. Level #13 is a remodel from a level by Kevin B. Reilly. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_11.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Revenge Collection 12', '2011-01-08', 50, 'Marcus Hof', 'Part 12 of the Revenge Collection is totally handmade. All levels have been tested and they are all solvable. Level #42 and #43 were inspired by levels from Thomas Reinke. Enjoy, have fun and keep thinking like a sokoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Revenge_Coll_12.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Richard Weston Collection', '2005-10-02', 10, 'Richard Weston', 'The following levels are best for ages 10+. Some (Levels 1,3 and 10) are deviously difficult, but ARE possible.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=HeyTak.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch', '2005-10-02', 50, 'David W Skinner', 'Sasquatch (50 puzzles, released January, 1999) This is my first set. Scott Lindhurst describes them as generally of just the right difficulty to be fun: not too easy, but (usually) not so hard that you get frustrated.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatch.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch II', '2010-02-19', 50, 'David W Skinner', 'Sasquatch II (50 puzzles, released August, 1999)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=massasquatch.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch III', '2005-10-02', 50, 'David W Skinner', 'Sasquatch III (50 puzzles, released June, 2000) This set ranges in difficulty from medium to very hard. Thirtyone of these levels explore some form of design symmetry. It is interesting (to me at least) to solve levels in which sections are reversed or rotated. Each transformation often suggests different approaches to the solution. However, sometimes the confusion created requires that each section be solved from scratch. Sometimes, I find levels in my earlier sets which I would do differently today. Included here are improved versions of two previous levels. Sasquatch III (41) = Mas Sasquatch (46) Sasquatch III (48) = Sasquatch (49)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatchiii.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch IV', '2005-10-02', 50, 'David W Skinner', 'Sasquatch IV (50 puzzles, released March 2001) These range in difficulty about like Sasquatch III. As always, I\'ve tried to explore a wide variety of puzzle types.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatchiv.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch IX', '2009-04-29', 50, 'David W Skinner', 'About one third of these are normal puzzles while the others are symetricals with lots of squares, diamonds and other shapes. Sasquatch IX #16 is an improved version of Sasquatch #15.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatchix.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch V', '2005-10-02', 50, 'David W Skinner', 'Sasquatch V (50 puzzles, released December, 2001) Again, a wide variety. This set contains several puzzles which exceed the 31x18 size limit of my previous sets.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatchv.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch VI', '2005-10-02', 50, 'David W Skinner', 'Sasquatch VI (50 puzzles, released October, 2002) This set, is a symmetrical feast. Forty of these levels involve some form of symmetry. There is also a sequence of levels where I explore the possibilities of working within squares of various sizes. This set contains several puzzles which exceed the 31x18 size limit of my first sets.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatchvi.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch VII', '2010-05-28', 50, 'David W Skinner', 'Sasquatch VII (50 puzzles, released June 2004) This set has a lot of symmetry but not as much as Sasquatch VI. I tried to do more normal puzzles this time. It also contains more expreiments with squares plus other shapes such as diamonds and a circle. As usual several oversize puzzles are at the end of the set.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatchvii.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch VIII', '2005-10-02', 50, 'David W Skinner', '50 puzzles, released March 2008. This set contains improved versions of two previous levels. Sasquatch VIII #37 = Sasquatch #31 Sasquatch VIII #38 = Mas Sasquatch #9', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sasquatchviii.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch X', '2011-01-13', 50, 'David W Skinner', 'Sasquatch X (50 puzzles, released July 2010)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sasquatchx.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch XI', '2011-01-13', 50, 'David W Skinner', 'Sasquatch XI (50 puzzles, released September 2010)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sasquatchxi.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sasquatch XII', '2014-02-04', 50, 'David W Skinner', 'Sasquatch XII collection by David W Skinner', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sasquatchxii.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Scoria', '2005-10-02', 20, 'Thomas Reinke', 'This is my first level set in around a year. All of the levels are easy, with only 3 boxes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Scoria.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Scoria 2', '2005-10-02', 20, 'Thomas Reinke', 'This is the second set in the series. All 20 levels have 4 boxes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Scoria_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Scoria 3', '2009-09-20', 20, 'Thomas Reinke', '20 levels, all with 5 boxes. There is a variety of difficulty here, but nothing too easy or hard. As always, comments are appreciated.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Scoria_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena1', '2005-10-02', 100, 'Eric F Tchong', 'First of the Serena series.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena2', '2005-10-02', 40, 'Eric F Tchong', 'Serena2 series.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena3', '2005-10-02', 26, 'Eric F Tchong', 'Serena3 dedicated to the 26 most beautiful women in the world.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena4', '2005-10-02', 40, 'Eric F Tchong', 'Serena4 Enjoy and greetings from Aruba.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena5', '2005-10-02', 40, 'Eric F Tchong', 'Serena5 series', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena5.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena6', '2005-10-02', 40, 'Eric F Tchong', 'Serena6 series', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena6.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena7', '2005-10-02', 40, 'Eric F Tchong', 'Serena7 series', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena7.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena8', '2005-10-02', 100, 'Eric F Tchong', '100 Levels for serena8. Enjoy these levels from Aruba...', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena8.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serena9', '2005-10-02', 100, 'Eric F Tchong', 'The last one of the serena series.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serena9.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serg Belyaev 1', '2010-08-06', 100, 'Serg Belyaev', 'Serg Belyaev collection 1', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serg_Belyaev_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serg Belyaev 2', '2010-08-06', 100, 'Serg Belyaev', 'Serg Belyaev collection 2', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serg_Belyaev_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serg Belyaev 3', '2010-08-06', 100, 'Serg Belyaev', 'Serg Belyaev collection 3', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serg_Belyaev_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serg Belyaev 4', '2010-11-16', 99, 'Serg Belyaev', 'Serg Belyaev collection 4', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serg_Belyaev_4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serg Belyaev 5', '2010-08-06', 100, 'Serg Belyaev', 'Serg Belyaev collection 5', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serg_Belyaev_5.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Serg Belyaev 6', '2010-08-06', 40, 'Serg Belyaev', 'Serg Belyaev collection 6', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Serg_Belyaev_6.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sharpen Collection', '2005-10-02', 150, 'Sven Egevad', 'Selected levels from Sven Egevads collection made harder.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sharpen.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Simple collection', '2005-10-02', 61, 'Phil Shapiro', 'Simple levels for children.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Simple.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Simplistic', '2014-04-17', 2, 'yotyot', 'Simplistic collection by yotyot', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Simplistic.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Simply', '2011-03-04', 24, 'Lars Nilsson', 'Collection by Lars Nilsson', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Simply.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Smaller, thinner, easier, better', '2010-11-28', 28, 'Martí Homs Caussa', 'This compilation includes the tiniest, easy, thin levels, and entertaining of resolving. Enjoy them! Ed: Removed many duplicates.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Better.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'SOKO-BONUS', '2005-10-02', 1, 'Einar Saukas', 'A single level originally distributed as sample with the freeware game SOKO-BAN produced by ZX-SOFT Brazil for the ZX-Spectrum, currently available at http://www.worldofspectrum.org/infoseekid.cgi?id=0017733 This level can be freely distributed and/or used commercially provided it remains unchanged and the author is properly credited.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Soko_Bonus.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokoban Junior 1', '2014-03-15', 58, 'Laura Wheeler', 'Sokoban Junior 1 collection by Laura Wheeler', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokoban_Junior_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokoban Junior 2', '2014-03-16', 54, 'Laura Wheeler', 'Sokoban Junior 2 collection by Laura Wheeler', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokoban_Junior_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokoban Online', '2005-10-02', 15, 'François Marques', 'A small collection of levels without pretetions created one day of idleness whereas I missed inspiration.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokoban_Online.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokoban Original Puzzles Tribute L', '2014-07-28', 14, 'Wayne Campbell', 'The other large format puzzles contain 25 levels including all 250 puzzles from the MS-DOS, Apple II, Commodore 64, Tandy Color Computer and XSokoban variants. Due to restrictions in Sokoban for Windows, this file contains only the 14 levels that differ from each other. There are four puzzles that are not playable in each set. They are: 12, 13, 15 and 47. This is due to their designs requiring start positions unreachable from anywhere outside their respective blocks. These puzzles are shown in a overstated solution, including all boxes (balls) and targets (goals) as boxes on targets. Differences between variants is shown. The Commodore 64 variant of puzzle 42 is not solvable. This error has existed since the game was released. This puzzle is shown in overstated solution.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokoOrigPuzzlesTributeLrg.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokobet', '2016-02-27', 29, 'DrFogh', 'Right through the alfabet. Because it is the danish alfabet, you will get a few bonus levels. Can be shared at your sokoban site, if you ask and show this text and the above information. Enjoy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokobet.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokobig 70', '2014-04-19', 69, 'Howard Abed', 'Sokobig 70 collection by Howard Abed', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokobig_70.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokobig 80', '2014-04-19', 48, 'Howard Abed', 'Sokobig 80 collection by Howard Abed', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokobig_80.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokobig Remodels', '2014-04-19', 7, 'Various Authors', 'Sokobig Remodels collection by various authors', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokobig_Remodels.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'SokoChallenge', '2010-07-09', 25, 'Kevin Cassol', 'A small number of tight levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokoChallenge.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'SokoCreation', '2014-04-13', 74, 'Howard Abed', 'SokoCreation coolection by Howard Abed', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokoCreation.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokocrisis', '2017-12-13', 34, 'Vipul Patel', 'Enjoy levels with remakes.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokocrisis.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokodeal', '2005-10-02', 100, 'Vipul Patel', 'Sokodeal', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokodeal.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokogen-990602 Levels', '2005-10-02', 78, 'Jaques Duthen', 'Jacques Duthen has created a new set of Sokoban puzzles called sokogen-990602. It contains 78 levels and is slightly more difficult than the Dimitry & Yorick set', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=sokogen-990602.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'SokoLasse', '2010-05-17', 50, 'Lars Nilsson', 'SokoLasse collection', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokoLasse.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokolasse 2', '2016-05-28', 31, 'Lars Nilsson', 'Sokolasse 2 collection by Lars Nilsson', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokolasse2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokolate', '2005-10-02', 44, 'François Marques', 'Life is like a box of chocolate, you never know what you get! Mr. Gump It is in this collection that I place my small levels, which are not difficult enough to be in Sokompact and a little too difficult to find their place in a collection for beginners.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokolate.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokomania', '2005-10-02', 124, 'Thomas Reinke', 'I found this set of 125 levels while reminiscing. Most of the levels suck, but some are good.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokomania.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokompact', '2005-10-02', 51, 'François Marques', 'Sokompact (Soko Must Place All Cans one Targets;) This collection contains only very small levels which were considered to be rather difficult. Each level of this collection took more than ten minutes to solve for a good player.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokompact.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sokophobia', '2005-10-02', 30, 'Vipul Patel', 'Last 13 levels are remodels of Grigr challange set', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sokophobia.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'SokoSpace', '2009-06-09', 17, 'Marko Dzekic', 'This collection is freeware. May 2009. Level 16 is a collaboration with Zhenying. 10 added remodels by York Shen and Minglw.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokoSpace.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'SokoStation', '2014-04-05', 110, 'Ghislain Martin', 'SokoStation Email: sokoban@wanadoo.fr Homepage: http://sokoban.fr/', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokoStation.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Soloban', '2005-10-02', 8, 'François Marques', 'This collection is currently composed of 8 levels. Each level contains only one package (hence the name of the collection). I created this collection of levels for the complete beginner who have never played Sokoban. It makes it possible familiarize with the goal of the play, its operation, moving of packages. After having finished this collection (in a little less than 30 minutes), the beginner can attack the collection of Novoban.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Soloban.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sonic', '2014-03-07', 26, 'Aleksey Krupenko', 'This collection is included in the program Sokoban, by Mack. Website: http://soko-ban.narod.ru/f_main.htm. Date of Last Change: 2014-01-08 19:23:50', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sonic.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Soundextensions and Circles', '2005-10-02', 7, 'W. M. Dekker', 'A sound has always an extension, like .WAV or .WMA or .MIDI. Difficulty: From simple to mediate. Circles: Very easy.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=WMD_First_part.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spirals', '2005-10-02', 7, 'Kseniya Mierzejewska', 'A small collection of large, easy spirals.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spirals.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spiros 01', '2012-09-19', 194, 'Spiros Mantzoukis', 'Collection 01 by Spiros Mantzoukis', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spiros_01.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spiros 02', '2012-09-20', 195, 'Spiros Mantzoukis', 'Collection 02 by Spiros Mantzoukis', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spiros_02.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spiros 03', '2012-09-22', 200, 'Spiros Mantzoukis', 'Collection 03 by Spiros Mantzoukis', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spiros_03.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spiros 04', '2012-09-24', 200, 'Spiros Mantzoukis', 'Collection 04 by Spiros Mantzoukis', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spiros_04.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spiros 05', '2012-09-27', 200, 'Spiros Mantzoukis', 'Collection 05 by Spiros Mantzoukis', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spiros_05.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spiros 06', '2012-10-23', 200, 'Spiros Mantzoukis', 'Collection 06 by Spiros Mantzoukis', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spiros_06.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Spiros 07', '2012-12-11', 200, 'Spiros Mantzoukis', 'Collection 07 by Spiros Mantzoukis', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Spiros_07.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Square Dance', '2015-01-27', 33, 'niwa', '33 levels of varying size and difficulty', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Square_Dance.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Squared', '2014-04-17', 42, 'Dries de Clercq', 'Squared collection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Squared.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Stari Fijaker', '2017-12-13', 7, 'Milan Vukosavljevic', 'Collection by Milan Vukosavljevic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Stari_Fijaker.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Still More collection', '2005-10-02', 35, 'J. Franklin Mentzer', 'This collection is copyright J Franklin Mentzer.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=StillMore.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Strategy', '2005-10-02', 100, 'Alberto García', 'Alberto Garcia - Strategy', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Strategy.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sunday Warmup', '2010-08-23', 2, 'Matthias \'muh\' Pauligk', 'Coffee, Ham & Eggs, Sokoban...', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sunday_Warmup.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Svens Collection', '2005-10-02', 1911, 'Sven Egevad', 'Sven Egevads collection The levels are in chronological order. Levels 1-49 were made in 1992, in the old Sokoban, and 50- made 2000 and later in Notepad. All tested in Sokomind. I have made a minor change in level 525, because it was a mirrored copy of level 522. (I thanks George Petrov for his observation.)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sven.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Sylvain Gravejat', '2012-09-16', 21, 'Sylvain Gravejat', 'Levels by Sylvain Gravejat and Guillaume Gravejat', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Sylvain_Gravejat.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Symmetrixx', '2014-04-05', 20, 'Seppolino', 'Symmetrixx collection by Seppolino', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Symmetrixx.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Takaken collection', '2005-10-02', 7, 'Ken\'ichiro Takahashi (takaken)', 'These levels are copyright Ken\'ichiro Takahashi (takaken).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Takaken.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Tammy Rock', '2012-02-13', 29, 'Eric F Tchong', 'tammy rocks 29 to honor vipul', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Tammy_Rock.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'TBox', '2005-10-02', 50, 'Thomas Reinke', 'More levels by a crazed 14 year old. Made using the Rbox sokoban solver.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=RBox_Levels.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'TBox 2', '2005-10-02', 50, 'Thomas Reinke', 'Second set in the Tbox series. 50 levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=TBox_2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'TBox 3', '2005-10-02', 25, 'Thomas Reinke', 'The third set in the Tbox series. Feel free to email me at thoms545.com', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=TBox_3.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'TBox 4', '2005-10-02', 25, 'Thomas Reinke', 'A set of 25 levels all with the same wall pattern. Generated using Rbox.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=TBox_4.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'TBox 5', '2005-10-02', 50, 'Thomas Reinke', '50 difficult levels. Generated using Rbox.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=TBox_5.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The Adventurer', '2005-10-02', 17, 'Ivelin Georgiev Ivanov', 'My First Level Set, Second Edition', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Ivo_Pack.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The Bagatelle 2 collection', '2005-10-02', 12, 'David Holland', 'Unfinished collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=bagatelle2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The bagatelle collection', '2005-10-02', 20, 'David Holland', 'Bagatelle is a French word for a trinket, from the Italian for a conjuror\'s trick. The collection contains fairly simple puzzles (of less difficulty than my previous collection maelstrom) of various sizes. Some of the small puzzles are easier versions of puzzles in my other collections. Others are my take on some classical Sokoban themes (goals in a line, in a cross shape, objects outside goal room for tricky start and finish). The problems posed by each puzzle are of a fairly straightforward kind, but are nevertheless quite varied. The puzzles are in roughly ascending order of difficulty.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=bagatelle.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The Cantrip 2 collection', '2005-10-02', 13, 'David Holland', 'Unfinished collection.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=cantrip2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The Cantrip collection', '2005-10-02', 20, 'David Holland', 'Author\'s note: The puzzles are all small (between 6 and 9 goals and pretty cramped), with maze and walls designed by me and computer-generated start positions. Because of the computer involvement, the start positions of the puzzles may look abstract or random. The meat of the puzzles is in the variations, the unexpected twists, and the underlying problems. The human element of design is most evident in the solved position, by construction, and I like to think of the solving process as producing order from chaos. This collection is meant for experienced solvers, or at least determined ones, as it contains probably my toughest puzzles so far. As usual I have tried to put the puzzles in rough ascending order of difficulty, but here this is even more approximate than usual as I find the puzzles difficult to compare. The puzzles have been extensively play-tested. On a good day I can actually solve them...', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=cantrip.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The dh1 collection', '2005-10-02', 10, 'David Holland', 'Author\'s note: I have experimented with computer-generation for several of the smaller puzzles hence the co-authorship with sokgen (a computer program of mine). If you like the puzzles email me and if you have stylistic criticisms direct them to sokgen :-)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=dh1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The dh2 collection', '2005-10-02', 10, 'David Holland', 'Author\'s note: There are no computer-generated levels as I am trying to evolve a puzzle-making style, and so experimenting with as many different forms as possible. Some of the puzzles are very, or slightly, symmetrical as a stylistic device (in this I am influenced by David W. Skinner\'s excellent Sasquatch puzzle sets at his Sokoban page). Others are completely unsymmetrical and the style is in the variations alone.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=dh2.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The First One', '2005-10-02', 1, 'Muhammad Umar', 'Better luck next time', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SQA-File.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The maelstrom collection', '2005-10-02', 21, 'David Holland', 'Author\'s note: The collection ranges from the pretty small (5 objects, 8x9 squares) through the mid-sized (13 objects, 15x11 squares) right up to the large (one puzzle with 57 objects 23x24 squares). Just browse for the kind of challenge you like. The puzzles are in rough order of difficulty. I designed the maze layout and goals for all the puzzles, and many but not all of the small puzzles use computer-generated start positions. A few of the puzzles feature unexpected twists within lengthy solutions and require substantial imagination, and the others I hope are at least interesting. A fully-featured Sokoban player (with drag and drop movement of objects, mouse movement of the man, ability to keep your place if you quit and return to the puzzle another time) is strongly recommended for the medium to larger puzzles, though not strictly necessary.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=maelstrm.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The SokEvo collection', '2005-10-02', 107, 'Lee Haywood', 'The SokEvo collection of Sokoban puzzle designs were generated by a program that used random numbers and a solving program to \'evolve\' them, primarily using the least number of moves required to solve a design as its fitness value.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokEvo.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The SokHard collection', '2005-10-02', 169, 'Lee Haywood', 'The SokHard collection of Sokoban puzzle designs were generated by a program that used random numbers and Brian Damgaard\'s YASGen program to rapidly \'evolve\' them, using the least number of pushes required to solve a design as its fitness value. Most of these designs feature a single target/goal area.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=SokHard.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The Solver\'s unsolvable', '2010-08-23', 3, 'Matthias \'muh\' Pauligk', 'All Levels are unsolvable with the most important Sokoban-Solvers', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Solvers_Unsolvable.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'The Warehouse I - Vertical Mobility', '2010-05-18', 50, 'Rick Sladkey', 'The Warehouse Volume I - Vertical Mobility (50 puzzles, released January, 2010) I would like to dedicate this level-set to Aymeric du Peloux for inspiration, to lotecsoftware.com who provided the Sokoban player for my mobile phone, and to my family for supporting my projects.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Warehouse-Vol-I.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Thinking Rabbit Arranged', '2014-03-16', 557, 'Thinking Rabbit', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Werner Ettinger (merging of initial collections, renaming all level names, making new alphabetical level order, removing duplicates).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Thinking_Rabbit_Arranged.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Title Screens', '2005-10-02', 4, 'John Polhemus', 'I created the following four screens for the fun of it.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=TitleScreens.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Trapdooooooooors', '2005-10-02', 1, 'Wilfrid Geiser', 'Note that there are as many o\'s in the title as there are trapdoors in the level. Like most levels with fixed topology this too is above all a matter of logical analysis. So if you are quick it will take you about 10 minutes to solve. 10 minutes of breathless run, not of thinking, though ;-)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Trapdoor.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Twisty', '2005-10-02', 3, 'Martin P Holland', 'The Twisty collection of Sokoban positions is copyright Martin P Holland <m.holland@noether.freeserve.co.uk> These levels may be distributed freely as long as this copyright message is retained.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Twisty.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'V2009', '2010-05-18', 158, 'Shaggath', 'Date Created: 01-01-09 Good luck :)', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=V2009.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'V2010', '2009-12-28', 151, 'Shaggath', 'Date Created: 2009-12-26', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=V2010.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Various', '2014-04-17', 24, 'Dries de Clercq', 'Various collection by Dries de Clercq', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Various.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Vladimir Tockic collection', '2017-12-13', 10, 'Vladimir Tockic', 'Classic-type levels', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=VT.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Warehouse', '2014-03-10', 372, 'Iroh', 'The levels in this set were collected, documented and published by Sokoplaza members. Collection supervisor: Mark (removing banal levels, removing levels with disturbing signs, renaming the new collection, removing duplicates, guessing the author\'s name - the name Iroh is an unofficial guess from one of the wall positions in a certain level, the actual author is unknown or anonymous, mainly due to the disturbing signs used).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Warehouse.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'YASGen', '2010-08-04', 28, 'Brian Damgaard', 'YASGen by Brian Damgaard', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=YASGen.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'YASGood', '2005-10-02', 50, 'Thomas Reinke', 'A set of 50 levels generated by the program YASGen. All of them are solvable this time.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=YASGood.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'York Shen Collection', '2014-03-25', 701, 'York Shen', 'The levels in this set were collected, documented and published by Sokoplaza members. Initial supervisor: Werner Ettinger (general supervisor, main composition of the initial giant collection of 2000 levels). Additional supervisor: Mark (further revision, removing duplicates equal to conjunction remodel sets, mainly Sasquatch remodels).', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=York_Shen_Collection.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Yoshio Murase\'s Auto-Generated', '2005-10-02', 52, 'Yoshio Murase', 'This set is computer generated. Visit Yoshio Murase\'s website and read more about this.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=AutoGen.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Yoshio Murase\'s Hand-Made', '2010-05-26', 54, 'Yoshio Murase', 'Handmade levels.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Handmade.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Zbigniew Kornas', '2014-03-16', 49, 'Zbigniew Kornas', 'This Sokoban level set is published here with the author\'s permission. The level set is distributed in a text format, that can be imported by most of the major Sokoban programs. For Microsoft Windows we recommend using Sokoban YASC, which can be downloaded from: http://sourceforge.net/projects/sokobanyasc/ Enjoy!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Zbigniew_Kornas.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Zelja', '2012-02-25', 2, 'Zeljko Negovanovic', 'Collection by Zeljko', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Zelja.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Zelja 1', '2012-03-06', 18, 'Zeljko Negovanovic', 'Zelja 1 by Zeljko Negovanovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Zelja_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Zig Zag Plus', '2014-03-13', 100, 'Alberto García', 'Zig Zag Plus collection by Alberto Garcia', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Zig_Zag_Plus.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Zika', '2012-03-06', 25, 'Zivojin Trifunovic', 'Zika by Zivojin Trifunovic', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Zika.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Zika 1', '2012-12-18', 43, 'Zivojin Trifunovic', 'I keep adding new levels. Greetings.', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Zika_1.slc'),
		A6($author$project$SokobanLevels$SokobanLevel, 'Zone 26', '2014-04-13', 117, 'Dries de Clercq', 'A huge collection where all levels have a floor size of 26 squares. Most of these levels are quite difficult!', 'https://www.sourcecode.se/sokoban/levels?act=dnl_text&file=Zone_26.slc')
	]);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		$author$project$Main$SelectLevel($author$project$SokobanLevels$sokobanLevels),
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Sokoban$Down = {$: 'Down'};
var $author$project$Sokoban$Left = {$: 'Left'};
var $author$project$Main$MoveHero = function (a) {
	return {$: 'MoveHero', a: a};
};
var $author$project$Sokoban$Right = {$: 'Right'};
var $author$project$Sokoban$Up = {$: 'Up'};
var $elm$json$Json$Decode$fail = _Json_fail;
var $author$project$Main$toDirection = function (string) {
	switch (string) {
		case 'ArrowLeft':
			return $elm$json$Json$Decode$succeed(
				$author$project$Main$MoveHero($author$project$Sokoban$Left));
		case 'ArrowRight':
			return $elm$json$Json$Decode$succeed(
				$author$project$Main$MoveHero($author$project$Sokoban$Right));
		case 'ArrowUp':
			return $elm$json$Json$Decode$succeed(
				$author$project$Main$MoveHero($author$project$Sokoban$Up));
		case 'ArrowDown':
			return $elm$json$Json$Decode$succeed(
				$author$project$Main$MoveHero($author$project$Sokoban$Down));
		default:
			return $elm$json$Json$Decode$fail('not supported key: ' + string);
	}
};
var $author$project$Main$keyDecoder = A2(
	$elm$json$Json$Decode$andThen,
	$author$project$Main$toDirection,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $author$project$Main$subscriptions = function (model) {
	if (model.$ === 'Play') {
		var game = model.c;
		var _v1 = game.gameState;
		if (_v1.$ === 'Running') {
			return $elm$browser$Browser$Events$onKeyDown($author$project$Main$keyDecoder);
		} else {
			return $elm$core$Platform$Sub$none;
		}
	} else {
		return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Main$GotTimerMsg = function (a) {
	return {$: 'GotTimerMsg', a: a};
};
var $author$project$Main$HttpFailure = {$: 'HttpFailure'};
var $author$project$Main$Loading = {$: 'Loading'};
var $author$project$Sokoban$Map = F5(
	function (hero, boxes, boxTargets, wallsAndFloors, name) {
		return {boxTargets: boxTargets, boxes: boxes, hero: hero, name: name, wallsAndFloors: wallsAndFloors};
	});
var $author$project$Main$ParsingFailed = function (a) {
	return {$: 'ParsingFailed', a: a};
};
var $author$project$Main$Play = F3(
	function (a, b, c) {
		return {$: 'Play', a: a, b: b, c: c};
	});
var $author$project$Main$SelectMap = function (a) {
	return {$: 'SelectMap', a: a};
};
var $author$project$Timer$StartTime = function (a) {
	return {$: 'StartTime', a: a};
};
var $author$project$Timer$StopTime = function (a) {
	return {$: 'StopTime', a: a};
};
var $author$project$Main$Success = function (a) {
	return {$: 'Success', a: a};
};
var $author$project$Timer$NotStarted = {$: 'NotStarted'};
var $author$project$Timer$create = $author$project$Timer$NotStarted;
var $author$project$Array2D$empty = A2(
	$elm$core$Array$initialize,
	0,
	function (_v0) {
		return $elm$core$Array$empty;
	});
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Main$GotSokobanMaps = function (a) {
	return {$: 'GotSokobanMaps', a: a};
};
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectString = function (toMsg) {
	return A2(
		$elm$http$Http$expectStringResponse,
		toMsg,
		$elm$http$Http$resolve($elm$core$Result$Ok));
};
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Main$getSokobanMaps = function (url) {
	return $elm$http$Http$get(
		{
			expect: $elm$http$Http$expectString($author$project$Main$GotSokobanMaps),
			url: 'https://cors-anywhere.herokuapp.com/' + url
		});
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Sokoban$Game = F4(
	function (map, gameState, stepCount, changes) {
		return {changes: changes, gameState: gameState, map: map, stepCount: stepCount};
	});
var $author$project$Sokoban$Running = {$: 'Running'};
var $author$project$Sokoban$init = function (map) {
	return A4($author$project$Sokoban$Game, map, $author$project$Sokoban$Running, 0, _List_Nil);
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$chompUntil = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A4($elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.context)) : A3(
				$elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, newOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$chompUntil = function (str) {
	return $elm$parser$Parser$Advanced$chompUntil(
		$elm$parser$Parser$toToken(str));
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $author$project$Sokoban$mapNameParser = $elm$parser$Parser$getChompedString(
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$chompUntil('\n')));
var $author$project$Sokoban$LoopState = F4(
	function (afterHashTag, map, x, y) {
		return {afterHashTag: afterHashTag, map: map, x: x, y: y};
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $author$project$Array2D$addNewRow = function (array2D) {
	return A2($elm$core$Array$push, $elm$core$Array$empty, array2D);
};
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $author$project$Sokoban$newLine = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed(_Utils_Tuple0),
	$elm$parser$Parser$chompIf(
		function (c) {
			return _Utils_eq(
				c,
				_Utils_chr('\n'));
		}));
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $author$project$Sokoban$addBox = F2(
	function (box, sokoban) {
		return _Utils_update(
			sokoban,
			{
				boxes: A2($elm$core$Set$insert, box, sokoban.boxes)
			});
	});
var $author$project$Sokoban$Floor = {$: 'Floor'};
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2($elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $author$project$Array2D$pushToLastRow = F2(
	function (element, array2D) {
		var lastIndex = $elm$core$Array$length(array2D) - 1;
		return A2(
			$elm$core$Array$indexedMap,
			F2(
				function (i, array) {
					return _Utils_eq(i, lastIndex) ? A2($elm$core$Array$push, element, array) : array;
				}),
			array2D);
	});
var $author$project$Sokoban$addFloor = function (map) {
	return _Utils_update(
		map,
		{
			wallsAndFloors: A2($author$project$Array2D$pushToLastRow, $author$project$Sokoban$Floor, map.wallsAndFloors)
		});
};
var $author$project$Sokoban$nextStateForBox = function (_v0) {
	var afterHashTag = _v0.afterHashTag;
	var map = _v0.map;
	var x = _v0.x;
	var y = _v0.y;
	return A4(
		$author$project$Sokoban$LoopState,
		afterHashTag,
		A2(
			$author$project$Sokoban$addBox,
			_Utils_Tuple2(x, y),
			$author$project$Sokoban$addFloor(map)),
		x + 1,
		y);
};
var $author$project$Sokoban$addBoxTarget = F2(
	function (boxTarget, map) {
		return _Utils_update(
			map,
			{
				boxTargets: A2($elm$core$Set$insert, boxTarget, map.boxTargets)
			});
	});
var $author$project$Sokoban$nextStateForBoxAndBoxTarget = function (_v0) {
	var afterHashTag = _v0.afterHashTag;
	var map = _v0.map;
	var x = _v0.x;
	var y = _v0.y;
	return A4(
		$author$project$Sokoban$LoopState,
		afterHashTag,
		A2(
			$author$project$Sokoban$addBoxTarget,
			_Utils_Tuple2(x, y),
			A2(
				$author$project$Sokoban$addBox,
				_Utils_Tuple2(x, y),
				$author$project$Sokoban$addFloor(map))),
		x + 1,
		y);
};
var $author$project$Sokoban$nextStateForBoxTarget = function (_v0) {
	var afterHashTag = _v0.afterHashTag;
	var map = _v0.map;
	var x = _v0.x;
	var y = _v0.y;
	return A4(
		$author$project$Sokoban$LoopState,
		afterHashTag,
		A2(
			$author$project$Sokoban$addBoxTarget,
			_Utils_Tuple2(x, y),
			$author$project$Sokoban$addFloor(map)),
		x + 1,
		y);
};
var $author$project$Sokoban$addHero = F2(
	function (hero, sokoban) {
		return _Utils_update(
			sokoban,
			{hero: hero});
	});
var $author$project$Sokoban$nextStateForHero = function (_v0) {
	var afterHashTag = _v0.afterHashTag;
	var map = _v0.map;
	var x = _v0.x;
	var y = _v0.y;
	return A4(
		$author$project$Sokoban$LoopState,
		afterHashTag,
		A2(
			$author$project$Sokoban$addHero,
			_Utils_Tuple2(x, y),
			$author$project$Sokoban$addFloor(map)),
		x + 1,
		y);
};
var $author$project$Sokoban$nextStateForHeroAndBoxTarget = function (_v0) {
	var afterHashTag = _v0.afterHashTag;
	var map = _v0.map;
	var x = _v0.x;
	var y = _v0.y;
	return A4(
		$author$project$Sokoban$LoopState,
		afterHashTag,
		A2(
			$author$project$Sokoban$addBoxTarget,
			_Utils_Tuple2(x, y),
			A2(
				$author$project$Sokoban$addHero,
				_Utils_Tuple2(x, y),
				$author$project$Sokoban$addFloor(map))),
		x + 1,
		y);
};
var $author$project$Sokoban$nextStateForNewLine = function (_v0) {
	var map = _v0.map;
	var y = _v0.y;
	return A4(
		$author$project$Sokoban$LoopState,
		false,
		_Utils_update(
			map,
			{
				wallsAndFloors: $author$project$Array2D$addNewRow(map.wallsAndFloors)
			}),
		0,
		y + 1);
};
var $author$project$Sokoban$Void = {$: 'Void'};
var $author$project$Sokoban$addVoid = function (map) {
	return _Utils_update(
		map,
		{
			wallsAndFloors: A2($author$project$Array2D$pushToLastRow, $author$project$Sokoban$Void, map.wallsAndFloors)
		});
};
var $author$project$Sokoban$nextStateForSpace = function (_v0) {
	var afterHashTag = _v0.afterHashTag;
	var map = _v0.map;
	var x = _v0.x;
	var y = _v0.y;
	return afterHashTag ? A4(
		$author$project$Sokoban$LoopState,
		afterHashTag,
		$author$project$Sokoban$addFloor(map),
		x + 1,
		y) : A4(
		$author$project$Sokoban$LoopState,
		afterHashTag,
		$author$project$Sokoban$addVoid(map),
		x + 1,
		y);
};
var $author$project$Sokoban$Wall = {$: 'Wall'};
var $author$project$Sokoban$addWall = function (map) {
	return _Utils_update(
		map,
		{
			wallsAndFloors: A2($author$project$Array2D$pushToLastRow, $author$project$Sokoban$Wall, map.wallsAndFloors)
		});
};
var $author$project$Sokoban$nextStateForWall = function (_v0) {
	var map = _v0.map;
	var x = _v0.x;
	var y = _v0.y;
	return A4(
		$author$project$Sokoban$LoopState,
		true,
		$author$project$Sokoban$addWall(map),
		x + 1,
		y);
};
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $author$project$Sokoban$space = $elm$parser$Parser$chompIf(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' '));
	});
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$Sokoban$mapParserHelp = function (loopState) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v0) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForSpace(loopState));
					}),
				$author$project$Sokoban$space),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v1) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForWall(loopState));
					}),
				$elm$parser$Parser$symbol('#')),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v2) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForHero(loopState));
					}),
				$elm$parser$Parser$symbol('@')),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v3) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForBox(loopState));
					}),
				$elm$parser$Parser$symbol('$')),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v4) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForBoxTarget(loopState));
					}),
				$elm$parser$Parser$symbol('.')),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v5) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForBoxAndBoxTarget(loopState));
					}),
				$elm$parser$Parser$symbol('*')),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v6) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForHeroAndBoxTarget(loopState));
					}),
				$elm$parser$Parser$symbol('+')),
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (_v7) {
						return $elm$parser$Parser$Loop(
							$author$project$Sokoban$nextStateForNewLine(loopState));
					}),
				$author$project$Sokoban$newLine),
				A2(
				$elm$parser$Parser$map,
				function (_v8) {
					return $elm$parser$Parser$Done(loopState);
				},
				$elm$parser$Parser$succeed(_Utils_Tuple0))
			]));
};
var $author$project$Sokoban$mapParser = A2(
	$elm$parser$Parser$map,
	function (loopState) {
		return loopState.map;
	},
	A2(
		$elm$parser$Parser$loop,
		A4(
			$author$project$Sokoban$LoopState,
			false,
			A5(
				$author$project$Sokoban$Map,
				_Utils_Tuple2(0, 0),
				$elm$core$Set$empty,
				$elm$core$Set$empty,
				$author$project$Array2D$addNewRow($author$project$Array2D$empty),
				''),
			0,
			0),
		$author$project$Sokoban$mapParserHelp));
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || (_Utils_eq(
			c,
			_Utils_chr('\n')) || _Utils_eq(
			c,
			_Utils_chr('\r')));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $author$project$Sokoban$mapAndNameParser = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			F2(
				function (map, mapName) {
					return _Utils_update(
						map,
						{name: mapName});
				})),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$author$project$Sokoban$mapParser,
				$elm$parser$Parser$symbol(';')),
			$elm$parser$Parser$spaces)),
	$author$project$Sokoban$mapNameParser);
var $author$project$Sokoban$mapsParserHelp = function (revMaps) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					function (map) {
						return $elm$parser$Parser$Loop(
							A2($elm$core$List$cons, map, revMaps));
					}),
				A2(
					$elm$parser$Parser$ignorer,
					A2($elm$parser$Parser$ignorer, $author$project$Sokoban$mapAndNameParser, $author$project$Sokoban$newLine),
					$author$project$Sokoban$newLine)),
				A2(
				$elm$parser$Parser$map,
				function (_v0) {
					return $elm$parser$Parser$Done(
						$elm$core$List$reverse(revMaps));
				},
				$elm$parser$Parser$succeed(_Utils_Tuple0))
			]));
};
var $author$project$Sokoban$mapsParser = A2($elm$parser$Parser$loop, _List_Nil, $author$project$Sokoban$mapsParserHelp);
var $author$project$Sokoban$Change = F2(
	function (hero, boxes) {
		return {boxes: boxes, hero: hero};
	});
var $author$project$Sokoban$Win = {$: 'Win'};
var $author$project$Sokoban$getGameState = function (sokoban) {
	return _Utils_eq(sokoban.boxes, sokoban.boxTargets) ? $author$project$Sokoban$Win : $author$project$Sokoban$Running;
};
var $author$project$Sokoban$move = F2(
	function (dir, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		switch (dir.$) {
			case 'Up':
				return _Utils_Tuple2(x, y - 1);
			case 'Down':
				return _Utils_Tuple2(x, y + 1);
			case 'Right':
				return _Utils_Tuple2(x + 1, y);
			default:
				return _Utils_Tuple2(x - 1, y);
		}
	});
var $author$project$Sokoban$Box_ = {$: 'Box_'};
var $author$project$Sokoban$Floor_ = {$: 'Floor_'};
var $author$project$Sokoban$Wall_ = {$: 'Wall_'};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Array2D$get = F2(
	function (_v0, array2D) {
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$elm$core$Maybe$andThen,
			$elm$core$Array$get(x),
			A2($elm$core$Array$get, y, array2D));
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$Sokoban$hasBox = F2(
	function (pos, boxes) {
		return A2($elm$core$Set$member, pos, boxes);
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Sokoban$objectAtDir = F2(
	function (position, map) {
		var objectInPos = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Sokoban$Void,
			A2($author$project$Array2D$get, position, map.wallsAndFloors));
		if (objectInPos.$ === 'Floor') {
			return A2($author$project$Sokoban$hasBox, position, map.boxes) ? $author$project$Sokoban$Box_ : $author$project$Sokoban$Floor_;
		} else {
			return $author$project$Sokoban$Wall_;
		}
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $author$project$Sokoban$updateBoxAt = F3(
	function (oldPos, newPos, boxes) {
		return A2(
			$elm$core$Set$insert,
			newPos,
			A2($elm$core$Set$remove, oldPos, boxes));
	});
var $author$project$Sokoban$moveHero = F2(
	function (dir, map) {
		var heroNextPos = A2($author$project$Sokoban$move, dir, map.hero);
		var _v0 = A2($author$project$Sokoban$objectAtDir, heroNextPos, map);
		switch (_v0.$) {
			case 'Box_':
				var boxNewPos = A2($author$project$Sokoban$move, dir, heroNextPos);
				var _v1 = A2($author$project$Sokoban$objectAtDir, boxNewPos, map);
				if (_v1.$ === 'Floor_') {
					return $elm$core$Maybe$Just(
						_Utils_update(
							map,
							{
								boxes: A3($author$project$Sokoban$updateBoxAt, heroNextPos, boxNewPos, map.boxes),
								hero: heroNextPos
							}));
				} else {
					return $elm$core$Maybe$Nothing;
				}
			case 'Floor_':
				return $elm$core$Maybe$Just(
					_Utils_update(
						map,
						{hero: heroNextPos}));
			default:
				return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Sokoban$nextState = F2(
	function (dir, game) {
		var mapNextState = A2($author$project$Sokoban$moveHero, dir, game.map);
		if (mapNextState.$ === 'Just') {
			var state = mapNextState.a;
			return A4(
				$author$project$Sokoban$Game,
				state,
				$author$project$Sokoban$getGameState(state),
				game.stepCount + 1,
				A2(
					$elm$core$List$cons,
					A2($author$project$Sokoban$Change, game.map.hero, game.map.boxes),
					game.changes));
		} else {
			return game;
		}
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$Sokoban$undo = function (_v0) {
	var map = _v0.map;
	var gameState = _v0.gameState;
	var stepCount = _v0.stepCount;
	var changes = _v0.changes;
	if (changes.b) {
		var lastState = changes.a;
		var rest = changes.b;
		return A4(
			$author$project$Sokoban$Game,
			_Utils_update(
				map,
				{boxes: lastState.boxes, hero: lastState.hero}),
			gameState,
			stepCount - 1,
			rest);
	} else {
		return A4($author$project$Sokoban$Game, map, gameState, stepCount, changes);
	}
};
var $author$project$Timer$Finished = F2(
	function (a, b) {
		return {$: 'Finished', a: a, b: b};
	});
var $author$project$Timer$finish = F2(
	function (finishTime, eTime) {
		if (eTime.$ === 'Started') {
			var startTime = eTime.a;
			return A2($author$project$Timer$Finished, startTime, finishTime);
		} else {
			return eTime;
		}
	});
var $author$project$Timer$Started = function (a) {
	return {$: 'Started', a: a};
};
var $author$project$Timer$start = function (startTime) {
	return $author$project$Timer$Started(startTime);
};
var $author$project$Timer$update = F2(
	function (msg, timer) {
		switch (msg.$) {
			case 'Start':
				return _Utils_Tuple2(
					timer,
					A2($elm$core$Task$perform, $author$project$Timer$StartTime, $elm$time$Time$now));
			case 'Stop':
				return _Utils_Tuple2(
					timer,
					A2($elm$core$Task$perform, $author$project$Timer$StopTime, $elm$time$Time$now));
			case 'StartTime':
				var now = msg.a;
				return _Utils_Tuple2(
					$author$project$Timer$start(now),
					$elm$core$Platform$Cmd$none);
			default:
				var now = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Timer$finish, now, timer),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'GetSokobanMaps':
				var url = msg.a;
				return _Utils_Tuple2(
					$author$project$Main$SelectMap($author$project$Main$Loading),
					$author$project$Main$getSokobanMaps(url));
			case 'GotSokobanMaps':
				var result = msg.a;
				if (result.$ === 'Ok') {
					var maps = result.a;
					var _v2 = A2($elm$parser$Parser$run, $author$project$Sokoban$mapsParser, maps);
					if (_v2.$ === 'Ok') {
						var sokobanMaps = _v2.a;
						return _Utils_Tuple2(
							$author$project$Main$SelectMap(
								$author$project$Main$Success(sokobanMaps)),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = _v2.a;
						return _Utils_Tuple2(
							$author$project$Main$SelectMap(
								$author$project$Main$ParsingFailed(err)),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					var err = result.a;
					return _Utils_Tuple2(
						$author$project$Main$SelectMap($author$project$Main$HttpFailure),
						$elm$core$Platform$Cmd$none);
				}
			case 'Select':
				var sokobanMap = msg.a;
				if (model.$ === 'SelectMap') {
					var loadMaps = model.a;
					if (loadMaps.$ === 'Success') {
						var maps = loadMaps.a;
						return _Utils_Tuple2(
							A3(
								$author$project$Main$Play,
								maps,
								$author$project$Timer$create,
								$author$project$Sokoban$init(sokobanMap)),
							A2(
								$elm$core$Platform$Cmd$map,
								$author$project$Main$GotTimerMsg,
								A2($elm$core$Task$perform, $author$project$Timer$StartTime, $elm$time$Time$now)));
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'MoveHero':
				var dir = msg.a;
				if (model.$ === 'Play') {
					var maps = model.a;
					var timer = model.b;
					var game = model.c;
					var next = A2($author$project$Sokoban$nextState, dir, game);
					var _v6 = next.gameState;
					if (_v6.$ === 'Win') {
						return _Utils_Tuple2(
							A3($author$project$Main$Play, maps, timer, next),
							A2(
								$elm$core$Platform$Cmd$map,
								$author$project$Main$GotTimerMsg,
								A2($elm$core$Task$perform, $author$project$Timer$StopTime, $elm$time$Time$now)));
					} else {
						return _Utils_Tuple2(
							A3($author$project$Main$Play, maps, timer, next),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'Restart':
				if (model.$ === 'Play') {
					var maps = model.a;
					var game = model.c;
					var originalMap = A2(
						$elm$core$Maybe$withDefault,
						A5(
							$author$project$Sokoban$Map,
							_Utils_Tuple2(0, 0),
							$elm$core$Set$empty,
							$elm$core$Set$empty,
							$author$project$Array2D$empty,
							''),
						$elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (map) {
									return _Utils_eq(map.name, game.map.name);
								},
								maps)));
					return _Utils_Tuple2(
						A3(
							$author$project$Main$Play,
							maps,
							$author$project$Timer$create,
							$author$project$Sokoban$init(originalMap)),
						A2(
							$elm$core$Platform$Cmd$map,
							$author$project$Main$GotTimerMsg,
							A2($elm$core$Task$perform, $author$project$Timer$StartTime, $elm$time$Time$now)));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'UndoStep':
				if (model.$ === 'Play') {
					var maps = model.a;
					var timer = model.b;
					var game = model.c;
					return _Utils_Tuple2(
						A3(
							$author$project$Main$Play,
							maps,
							timer,
							$author$project$Sokoban$undo(game)),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'BackToMaps':
				if (model.$ === 'Play') {
					var maps = model.a;
					return _Utils_Tuple2(
						$author$project$Main$SelectMap(
							$author$project$Main$Success(maps)),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				var timerMsg = msg.a;
				if (model.$ === 'Play') {
					var maps = model.a;
					var timer = model.b;
					var game = model.c;
					var _v11 = A2($author$project$Timer$update, timerMsg, timer);
					var nTimer = _v11.a;
					var cmd = _v11.b;
					return _Utils_Tuple2(
						A3($author$project$Main$Play, maps, nTimer, game),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$GotTimerMsg, cmd));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
		}
	});
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $author$project$Main$BackToMaps = {$: 'BackToMaps'};
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Main$svgRect = F7(
	function (x_, y_, width_, height_, fill_, stroke_, fillOpacity_) {
		return A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromInt(x_)),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromInt(y_)),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromInt(width_)),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromInt(height_)),
					$elm$svg$Svg$Attributes$fill(fill_),
					$elm$svg$Svg$Attributes$stroke(stroke_),
					$elm$svg$Svg$Attributes$fillOpacity(fillOpacity_)
				]),
			_List_Nil);
	});
var $author$project$Main$svgBackButton = F2(
	function (x, y) {
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick($author$project$Main$BackToMaps),
					$elm$svg$Svg$Attributes$fill('#d2b48c')
				]),
			_List_fromArray(
				[
					A7($author$project$Main$svgRect, x, y, 50, 25, '', '#522200', ''),
					A2(
					$elm$svg$Svg$polygon,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points('0,25 25,0 25 50'),
							$elm$svg$Svg$Attributes$fill(''),
							$elm$svg$Svg$Attributes$stroke('#522200')
						]),
					_List_Nil),
					A7($author$project$Main$svgRect, 12, 13, 24, 24, '', '', '')
				]));
	});
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $author$project$Main$svgMoves = F3(
	function (x_, y_, stepCount) {
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A7($author$project$Main$svgRect, x_, y_, 50, 45, '#d2b48c', '#522200', ''),
					A2(
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(x_ + 2)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(y_ + 22)),
							$elm$svg$Svg$Attributes$fill('#522200')
						]),
					_List_fromArray(
						[
							$elm$svg$Svg$text('Moves:')
						])),
					A2(
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(x_ + 18)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(y_ + 35)),
							$elm$svg$Svg$Attributes$fill('#522200')
						]),
					_List_fromArray(
						[
							$elm$svg$Svg$text(
							$elm$core$String$fromInt(stepCount))
						]))
				]));
	});
var $author$project$Main$Restart = {$: 'Restart'};
var $author$project$Main$svgRestartButton = F2(
	function (x_, y_) {
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$html$Html$Events$onClick($author$project$Main$Restart)
				]),
			_List_fromArray(
				[
					A7($author$project$Main$svgRect, x_, y_, 50, 45, '#d2b48c', '#522200', ''),
					A2(
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromInt(x_ + 2)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromInt(y_ + 22)),
							$elm$svg$Svg$Attributes$fill('#522200')
						]),
					_List_fromArray(
						[
							$elm$svg$Svg$text('Restart')
						]))
				]));
	});
var $author$project$Main$UndoStep = {$: 'UndoStep'};
var $author$project$Main$svgUndoButton = A2(
	$elm$svg$Svg$g,
	_List_fromArray(
		[
			$elm$html$Html$Events$onClick($author$project$Main$UndoStep)
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('250,25 275,0 275,50'),
					$elm$svg$Svg$Attributes$fill('darkred'),
					$elm$svg$Svg$Attributes$stroke('#522200')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('275,25 300,0 300,50'),
					$elm$svg$Svg$Attributes$fill('darkred'),
					$elm$svg$Svg$Attributes$stroke('#522200')
				]),
			_List_Nil)
		]));
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Main$menu = function (stepCount) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('300'),
				$elm$svg$Svg$Attributes$height('50'),
				$elm$svg$Svg$Attributes$viewBox('0 0 300 50')
			]),
		_List_fromArray(
			[
				A2($author$project$Main$svgBackButton, 25, 12),
				A2($author$project$Main$svgRestartButton, 100, 0),
				A3($author$project$Main$svgMoves, 175, 0, stepCount),
				$author$project$Main$svgUndoButton
			]));
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$Main$GetSokobanMaps = function (a) {
	return {$: 'GetSokobanMaps', a: a};
};
var $author$project$Main$viewLevel = function (sokobanLevel) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('level'),
				$elm$html$Html$Events$onClick(
				$author$project$Main$GetSokobanMaps(sokobanLevel.link))
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('info')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(sokobanLevel.title)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('info')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(sokobanLevel.date)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('info')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(sokobanLevel.numberOfLevels))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('info')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(sokobanLevel.author)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('desc')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(sokobanLevel.description)
					]))
			]));
};
var $author$project$Main$Select = function (a) {
	return {$: 'Select', a: a};
};
var $author$project$Array2D$height = function (array2D) {
	return $elm$core$Array$length(array2D);
};
var $elm$svg$Svg$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2($elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2($elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		nodeList: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		nodeListSize: (len / $elm$core$Array$branchFactor) | 0,
		tail: tail
	};
};
var $elm$core$Array$append = F2(
	function (a, _v0) {
		var aTail = a.d;
		var bLen = _v0.a;
		var bTree = _v0.c;
		var bTail = _v0.d;
		if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (node.$ === 'SubTree') {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				$elm$core$Array$appendHelpTree,
				bTail,
				A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (node.$ === 'SubTree') {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				$elm$core$Array$builderToArray,
				true,
				A2(
					$elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						$elm$core$Elm$JsArray$foldl,
						foldHelper,
						$elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var $author$project$Array2D$concat = function (array2D) {
	return A3(
		$elm$core$Array$foldr,
		function (array) {
			return function (acc) {
				return A2($elm$core$Array$append, array, acc);
			};
		},
		$elm$core$Array$empty,
		array2D);
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $author$project$Array2D$indexedMap = F2(
	function (func, array2D) {
		return A2(
			$elm$core$Array$indexedMap,
			F2(
				function (iy, array) {
					return A2(
						$elm$core$Array$indexedMap,
						F2(
							function (ix, a) {
								return A2(
									func,
									_Utils_Tuple2(ix, iy),
									a);
							}),
						array);
				}),
			array2D);
	});
var $author$project$Main$sokobanBox = F3(
	function (x, y, width) {
		var boxWidth = width - 16;
		var w = (boxWidth / 4) | 0;
		return _List_fromArray(
			[
				A7($author$project$Main$svgRect, x + 8, y + 8, w, boxWidth, '#664c28', 'black', ''),
				A7($author$project$Main$svgRect, (x + 8) + (1 * w), y + 8, w, boxWidth, '#664c28', 'black', ''),
				A7($author$project$Main$svgRect, (x + 8) + (2 * w), y + 8, w, boxWidth, '#664c28', 'black', ''),
				A7($author$project$Main$svgRect, (x + 8) + (3 * w), y + 8, w, boxWidth, '#664c28', 'black', ''),
				A7($author$project$Main$svgRect, x + 8, y + 8, boxWidth, w, '#664c28', 'black', ''),
				A7($author$project$Main$svgRect, x + 8, (y + 8) + (3 * w), boxWidth, w, '#664c28', 'black', '')
			]);
	});
var $author$project$Main$svgSquare = F5(
	function (x_, y_, width_, fill_, stroke_) {
		return A7($author$project$Main$svgRect, x_, y_, width_, width_, fill_, stroke_, '');
	});
var $author$project$Main$sokobanBoxTarget = F3(
	function (x, y, width) {
		var boxWidth = width - 8;
		return _List_fromArray(
			[
				A5($author$project$Main$svgSquare, x + 4, y + 4, boxWidth, '#6495ed', '#000080')
			]);
	});
var $author$project$Main$sokobanFloor = F3(
	function (x, y, width) {
		return _List_fromArray(
			[
				A5($author$project$Main$svgSquare, x, y, width, '#ffe4c4', '#f5deb3'),
				A5($author$project$Main$svgSquare, x + 2, y + 2, width - 4, '#faebd7', '#d2b48c')
			]);
	});
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $author$project$Main$sokobanHero = F3(
	function (x, y, width) {
		var radius = ((width - 16) / 2) | 0;
		return _List_fromArray(
			[
				A2(
				$elm$svg$Svg$circle,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$cx(
						$elm$core$String$fromInt(x + ((width / 2) | 0))),
						$elm$svg$Svg$Attributes$cy(
						$elm$core$String$fromInt(y + ((width / 2) | 0))),
						$elm$svg$Svg$Attributes$r(
						$elm$core$String$fromInt(radius)),
						$elm$svg$Svg$Attributes$fill('#dc143c')
					]),
				_List_Nil)
			]);
	});
var $author$project$Main$sokobanWall = F3(
	function (x, y, width) {
		return _List_fromArray(
			[
				A5($author$project$Main$svgSquare, x, y, width, '#7a3300', '#612800'),
				A5($author$project$Main$svgSquare, x + 2, y + 2, width - 4, '#943e00', '#522200')
			]);
	});
var $author$project$Main$svgSokobanMap = function (sokobanMap) {
	return $elm$core$List$concat(
		$elm$core$Array$toList(
			$author$project$Array2D$concat(
				A2(
					$author$project$Array2D$indexedMap,
					F2(
						function (_v0, mapElement) {
							var x = _v0.a;
							var y = _v0.b;
							if (_Utils_eq(
								_Utils_Tuple2(x, y),
								sokobanMap.hero) && A2(
								$elm$core$Set$member,
								_Utils_Tuple2(x, y),
								sokobanMap.boxTargets)) {
								return _Utils_ap(
									A3($author$project$Main$sokobanFloor, x * 40, y * 40, 40),
									_Utils_ap(
										A3($author$project$Main$sokobanBoxTarget, x * 40, y * 40, 40),
										A3($author$project$Main$sokobanHero, x * 40, y * 40, 40)));
							} else {
								if (_Utils_eq(
									_Utils_Tuple2(x, y),
									sokobanMap.hero)) {
									return _Utils_ap(
										A3($author$project$Main$sokobanFloor, x * 40, y * 40, 40),
										A3($author$project$Main$sokobanHero, x * 40, y * 40, 40));
								} else {
									if (A2(
										$elm$core$Set$member,
										_Utils_Tuple2(x, y),
										sokobanMap.boxes) && A2(
										$elm$core$Set$member,
										_Utils_Tuple2(x, y),
										sokobanMap.boxTargets)) {
										return _Utils_ap(
											A3($author$project$Main$sokobanFloor, x * 40, y * 40, 40),
											_Utils_ap(
												A3($author$project$Main$sokobanBoxTarget, x * 40, y * 40, 40),
												A3($author$project$Main$sokobanBox, x * 40, y * 40, 40)));
									} else {
										if (A2(
											$elm$core$Set$member,
											_Utils_Tuple2(x, y),
											sokobanMap.boxes)) {
											return _Utils_ap(
												A3($author$project$Main$sokobanFloor, x * 40, y * 40, 40),
												A3($author$project$Main$sokobanBox, x * 40, y * 40, 40));
										} else {
											if (A2(
												$elm$core$Set$member,
												_Utils_Tuple2(x, y),
												sokobanMap.boxTargets)) {
												return _Utils_ap(
													A3($author$project$Main$sokobanFloor, x * 40, y * 40, 40),
													A3($author$project$Main$sokobanBoxTarget, x * 40, y * 40, 40));
											} else {
												switch (mapElement.$) {
													case 'Floor':
														return A3($author$project$Main$sokobanFloor, x * 40, y * 40, 40);
													case 'Wall':
														return A3($author$project$Main$sokobanWall, x * 40, y * 40, 40);
													default:
														return _List_Nil;
												}
											}
										}
									}
								}
							}
						}),
					sokobanMap.wallsAndFloors))));
};
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $author$project$Array2D$width = function (array2D) {
	return A3(
		$elm$core$Array$foldl,
		F2(
			function (array, acc) {
				return A2(
					$elm$core$Basics$max,
					acc,
					$elm$core$Array$length(array));
			}),
		0,
		array2D);
};
var $author$project$Main$viewMiniMap = function (map) {
	var mapWidth = $author$project$Array2D$width(map.wallsAndFloors) * 15;
	var mapHeight = $author$project$Array2D$height(map.wallsAndFloors) * 15;
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(map.name)
					])),
				A2(
				$elm$svg$Svg$svg,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$width('80%'),
						$elm$svg$Svg$Attributes$height('30vh'),
						$elm$svg$Svg$Attributes$viewBox(
						'0 0 ' + ($elm$core$String$fromInt(mapWidth * 3) + (' ' + $elm$core$String$fromInt(mapHeight * 3)))),
						$elm$svg$Svg$Events$onClick(
						$author$project$Main$Select(map))
					]),
				$author$project$Main$svgSokobanMap(map))
			]));
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $author$project$Timer$elapsedTime = function (eTime) {
	if (eTime.$ === 'Finished') {
		var startT = eTime.a;
		var finishT = eTime.b;
		return $elm$core$Maybe$Just(
			$elm$time$Time$millisToPosix(
				$elm$time$Time$posixToMillis(finishT) - $elm$time$Time$posixToMillis(startT)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $author$project$Timer$twoDigit = function (string) {
	return ($elm$core$String$length(string) <= 1) ? ('0' + string) : string;
};
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Timer$elapsedTimeString = function (eTime) {
	var _v0 = $author$project$Timer$elapsedTime(eTime);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Maybe$Nothing;
	} else {
		var time = _v0.a;
		var second = $elm$core$String$fromInt(
			A2($elm$time$Time$toSecond, $elm$time$Time$utc, time));
		var minute = $elm$core$String$fromInt(
			A2($elm$time$Time$toMinute, $elm$time$Time$utc, time));
		var hour = $elm$core$String$fromInt(
			A2($elm$time$Time$toHour, $elm$time$Time$utc, time));
		return $elm$core$Maybe$Just(
			$author$project$Timer$twoDigit(hour) + (':' + ($author$project$Timer$twoDigit(minute) + (':' + $author$project$Timer$twoDigit(second)))));
	}
};
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $author$project$Main$winDialog = F2(
	function (timer, moves) {
		return _List_fromArray(
			[
				A7($author$project$Main$svgRect, 100, 100, 200, 100, '#ffe4c4', 'black', '0.8'),
				A2(
				$elm$svg$Svg$text_,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('140'),
						$elm$svg$Svg$Attributes$y('140'),
						$elm$svg$Svg$Attributes$fill('black'),
						$elm$svg$Svg$Attributes$fontSize('20')
					]),
				_List_fromArray(
					[
						$elm$svg$Svg$text('Congratulations!')
					])),
				A2(
				$elm$svg$Svg$text_,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('140'),
						$elm$svg$Svg$Attributes$y('160'),
						$elm$svg$Svg$Attributes$fill('black'),
						$elm$svg$Svg$Attributes$fontSize('20')
					]),
				_List_fromArray(
					[
						$elm$svg$Svg$text(
						'Moves: ' + $elm$core$String$fromInt(moves))
					])),
				A2(
				$elm$svg$Svg$text_,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('140'),
						$elm$svg$Svg$Attributes$y('180'),
						$elm$svg$Svg$Attributes$fill('black'),
						$elm$svg$Svg$Attributes$fontSize('20')
					]),
				_List_fromArray(
					[
						$elm$svg$Svg$text(
						'Time: ' + A2(
							$elm$core$Maybe$withDefault,
							'',
							$author$project$Timer$elapsedTimeString(timer)))
					]))
			]);
	});
var $author$project$Main$viewSokoban = F2(
	function (timer, sokoban) {
		var mapWidth = $elm$core$String$fromInt(
			$author$project$Array2D$width(sokoban.map.wallsAndFloors) * 40);
		var mapHeight = $elm$core$String$fromInt(
			$author$project$Array2D$height(sokoban.map.wallsAndFloors) * 40);
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width('96vh'),
					$elm$svg$Svg$Attributes$height('90vh'),
					$elm$svg$Svg$Attributes$viewBox('0 0 ' + (mapWidth + (' ' + mapHeight)))
				]),
			function () {
				var _v0 = sokoban.gameState;
				if (_v0.$ === 'Win') {
					return _Utils_ap(
						$author$project$Main$svgSokobanMap(sokoban.map),
						A2($author$project$Main$winDialog, timer, sokoban.stepCount));
				} else {
					return $author$project$Main$svgSokobanMap(sokoban.map);
				}
			}());
	});
var $author$project$Main$view = function (model) {
	switch (model.$) {
		case 'SelectLevel':
			var levels = model.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('level-select')
					]),
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h1,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('level-select-header')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Sokoban levels')
								])),
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('levels-source'),
									$elm$html$Html$Attributes$href('https://www.sourcecode.se/sokoban/levels'),
									$elm$html$Html$Attributes$target('_blank')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('(Levels source https://www.sourcecode.se/sokoban/levels)')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('level')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('info')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Title')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('info')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Date')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('info')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Number of levels')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('info')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Author')
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('desc')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Description')
										]))
								]))
						]),
					A2(
						$elm$core$List$map,
						function (level) {
							return $author$project$Main$viewLevel(level);
						},
						levels)));
		case 'SelectMap':
			var loadMaps = model.a;
			switch (loadMaps.$) {
				case 'HttpFailure':
					return $elm$html$Html$text('Http failed');
				case 'Loading':
					return $elm$html$Html$text('Loading...');
				case 'ParsingFailed':
					var err = loadMaps.a;
					return $elm$html$Html$text(
						$elm$core$Debug$toString(err));
				default:
					var maps = loadMaps.a;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('map-select')
							]),
						A2(
							$elm$core$List$map,
							function (sokoban) {
								return $author$project$Main$viewMiniMap(sokoban);
							},
							maps));
			}
		default:
			var time = model.b;
			var game = model.c;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('centered')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('d-flex mb-10 mt-10 menu')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('f-25 mr-20 as-center')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(game.map.name)
									])),
								$author$project$Main$menu(game.stepCount)
							])),
						A2($author$project$Main$viewSokoban, time, game)
					]));
	}
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));