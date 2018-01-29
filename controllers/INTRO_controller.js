exports.entra = function (req, res) {
  res.render('home', {anchor:'#navbarNav0'});
}

exports.quees = function (req, res) {
  res.render('home', {anchor:'#quees'});
}

exports.provar = function (req, res) {
  res.render('home',  {anchor:'#provar'});
}

exports.bloc = function (req, res) {
  res.render('home');
}