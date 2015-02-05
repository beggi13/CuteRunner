var easing = {
	
// t-current time
// b-starting pos
// c-change in pos
// d-duration of ease
out_back_quartic : function(t, b, c, d){
	var ts = (t/=d) * t;
	var tc = ts * t;
	return b+c*(-2*ts*ts + 10*tc + -15*ts + 8*t);
},

in_quintic : function(t, b, c, d) {
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(tc*ts);
},

out_quintic : function(t, b, c, d) {
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(tc*ts + -5*ts*ts + 10*tc + -10*ts + 5*t);
},

back_in_quartic : function(t, b, c, d) {
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(2*ts*ts + 2*tc + -3*ts);
}
 
}