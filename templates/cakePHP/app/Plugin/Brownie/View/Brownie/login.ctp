<div id="login">
	<div id="login-inside" class="clearfix">
		<h1><?php echo __d('brownie', 'Login'); ?></h1>
		<p>
			<?php
			echo '<stong>' . __d('brownie', 'Bem Vindo!') . '</strong>. ';
			echo __d('brownie', 'Por favor entre com seu usuário e senha');
			?>
		</p>
		<?php
		echo $this->Session->flash('auth');
		echo $this->Form->create();
		echo $this->Form->input('BrwUser.email', array('label' => __d('brownie', 'Usuário')));
		echo $this->Form->input('BrwUser.password', array('label' => __d('brownie', 'Senha')));
		echo $this->Form->end(__d('brownie', 'Login'), array('class' => 'submit'));
		?>
	</div>
</div>