<template>
    <div>

        <Navbar/>
        
        <!-- se le pasa por props los datos a renderizar-->
        <Carosuel :carosuelItems="carosuel"/>
     
        <Section1 :section1Items="section1" class="my-12" />

        <Section2 :section2Items="section2" class="my-12" />
       
        <Section3 :section3Items="section3" class="my-12" />
            
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Carosuel from '@/components/Carosuel.vue'
import Section1 from '@/components/Section1.vue'
import Section2 from '@/components/Section2.vue'
import Section3 from '@/components/Section3.vue'

export default {
    name: 'ConsigueTrabajo',
    components:{
        Navbar,
        Carosuel,
        Section1,
        Section2,
        Section3
    },
    data() {
        return {
            //datos que el componente Carosuel debe renderizar
            carosuel:[
              { img: require('@/assets/worker.jpg'), text:'Trabaja con libertad y eficiencia'},
              { img: require('@/assets/worker2.jpg'), text:'Busca trabajo con respecto a tus habilidades'}
            ],
            //datos que el componente Section1 debe renderizar
            section1:{
                title: 'Busca proyectos ideales para ti',
                subtitle: ['Crea tu perfil de freelancer', 'Busca proyectos','Descubre oportunidades'],
                btn: { text: 'Comienza a trabajar', route: '/login'},
                img: require('@/assets/MessyDoodle.png')
            },
            //datos que el componente Section2 debe renderizar
            section2:[
              { icon: 'computer', text:'Puedes trabajar de manera remota. Tu eliges tus horarios y te organizas con tu tiempo.'},
              { icon: 'insert_comment', text:'Cientos de proyectos diarios que se adaptan a tus habilidades y experiencia.'},
              { icon: 'verified_user', text:'Plataforma segura para trabajar, garantizando los pagos y cumplientos de expectativas.'},
            ],
            //datos que el componente Section3 debe renderizar
            section3:{
                title: '¿Ya estás listo para potenciar tu carrera freelance?',
                btn: { text: 'Crear perfil', route: '/registrate'},
                img: require('@/assets/FloatDoodle.png')
            },    
        }
    },
}
</script>

<style  scoped>

</style>