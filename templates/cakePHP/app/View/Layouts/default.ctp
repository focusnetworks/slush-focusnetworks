<?php
/*
* Scaffolding for CakePHP projects using Slush
*
* @enterprise    Focusnetworks
* @author        Danilo Vaz
* @copyright     Copyright (c) Focusnetworks (http://focusnetworks.com.br)
* @link          https://github.com/focusnetworks/slush-focusnetworks
* @package       app.View.Layouts
* @since         Slush Focusnetworks v 0.0.1
* @license       http://www.opensource.org/licenses/mit-license.php MIT License
*/

//title page
$cakeDescription = "Scaffolding for CakePHP projects using Slush";
?>
<!DOCTYPE html>
<html class="no-js" lang="pt-br">
<head>
	<?php echo $this->Html->charset(); ?>
	<title>
		<?php echo $cakeDescription ?>:
		<?php echo $this->fetch('title'); ?>
	</title>

	<?php
		echo $this->Html->meta('icon');

		echo $this->Html->css(array('foundation', 'style', 'flexslider'));
		echo $this->Html->script('/js/vendor/modernizr');

		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
	?>
</head>
<body>
	<nav class="menu-principal">
		<ul class="inline-list">
			<li><a href="">Home</a></li>
			<li><a href="">Quem somos</a></li>
			<li><a href="/especialidades">Especialidades</a></li>
			<li><a href="">Galeria</a></li>
			<li><a href="">Contato</a></li>
		</ul>
	</nav>
	<div class="row">
		<div class="large-12 columns">
			<h1 class="logo">
				<?php echo $this->Html->image("lc-logo-escuro.jpg", array( "alt" => "LC | Lopes & Carvalho Advocacia", "title" => "LC | Lopes & Carvalho Advocacia" , 'url' => array('controller' => 'pages', 'action' => 'display')));
				?>
			</h1>
		</div>
	</div>

	<div class="row">
		<div class="large-12 columns">
			<div class="flexslider">
			  <ul class="slides">
			    <li>
					<?php echo $this->Html->image("slider1.jpg", array( "alt" => "LC | Lopes & Carvalho Advocacia", "title" => "LC | Lopes & Carvalho Advocacia"));
					?>
			    </li>
			    <li>
					<?php echo $this->Html->image("slider1.jpg", array( "alt" => "LC | Lopes & Carvalho Advocacia", "title" => "LC | Lopes & Carvalho Advocacia"));
					?>
			    </li>
			    <li>
					<?php echo $this->Html->image("slider1.jpg", array( "alt" => "LC | Lopes & Carvalho Advocacia", "title" => "LC | Lopes & Carvalho Advocacia"));
					?>
			    </li>
			    <li>
					<?php echo $this->Html->image("slider1.jpg", array( "alt" => "LC | Lopes & Carvalho Advocacia", "title" => "LC | Lopes & Carvalho Advocacia"));
					?>
			    </li>
			  </ul>
			</div>
		</div>
	</div>
	<section>
		<div class="row">
			<div class="large-12 medium-12 columns">
				<article>
					<h1>Especialidades</h1>
				</article>
			</div>
		</div>
		<div class="row">
			<div class="large-3 medium-3 columns">
				<article>
					<h2 class="subheader linha">Trabalhista</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet tincidunt urna id dignissim. Sed volutpat mi eu ante feugiat, eu interdum mauris ullamcorper. </p>
					<a href="" class="tiny button expand">Saiba mais</a>
				</article>
			</div>
			<div class="large-3 medium-3 columns">
				<article>
					<h2 class="subheader linha">Civil</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet tincidunt urna id dignissim. Sed volutpat mi eu ante feugiat, eu interdum mauris ullamcorper. </p>
					<a href="" class="tiny button expand">Saiba mais</a>
				</article>
			</div>
			<div class="large-3 medium-3 columns">
				<article>
					<h2 class="subheader linha">Criminal</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet tincidunt urna id dignissim. Sed volutpat mi eu ante feugiat, eu interdum mauris ullamcorper. </p>
					<a href="" class="tiny button expand">Saiba mais</a>
				</article>
			</div>
			<div class="large-3 medium-3 columns">
				<article>
					<h2 class="subheader linha">Empresarial</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet tincidunt urna id dignissim. Sed volutpat mi eu ante feugiat, eu interdum mauris ullamcorper. </p>
					<a href="" class="tiny button expand">Saiba mais</a>
				</article>
			</div>
		</div>
	</section>

	<footer>
		<div class="row">
			<div class="large-3 medium-3 columns">
				<?php echo $this->Html->image("lc-logo-claro.png", array( "alt" => "LC | Lopes & Carvalho Advocacia", "title" => "LC | Lopes & Carvalho Advocacia"));
				?>
			</div>
			<div class="large-3 medium-3 columns">
				<ul class="no-bullet">
					<li><a href="">Home</a></li>
					<li><a href="">Quem somos</a></li>
					<li><a href="">Especialidades</a></li>
					<li><a href="">Galeria</a></li>
					<li><a href="">Contato</a></li>
				</ul>
			</div>
			<div class="large-3 medium-3 columns">
			</div>
			<div class="large-3 medium-3 columns">
			</div>
		</div>
	</footer>

	<?php echo $this->Html->script(array('/js/vendor/jquery', 'foundation.min', 'jquery.flexslider-min')); ?>

	<script>
		$(document).foundation();
			//don't use with .ready isn't good, but you can use
			$(window).load(function() {
			  $('.flexslider').flexslider({
			    animation: "slide"
			  });
		});
	</script>
</body>
</html>
