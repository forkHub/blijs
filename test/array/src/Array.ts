console.log('empty dim:')
console.log(Dim());

console.log('single dim:')
console.log(Dim(10));

console.log('double dim:');
console.log(Dim(10, 10));

console.log('single with callback');
console.log(Dim(10, (item: any) => {
	item.x = 0;
}));

console.log('double with callback');
console.log(Dim(10, 10, (item: any) => {
	item.x = 0;
}));