<template>
    <div>

        <Navbar/>

        <!-- se le pasa por props los datos a renderizar-->
        <Carosuel :carosuelItems="carosuel" />
        
        <Section1 :section1Items="section1" class="my-12" />

        <Section2 :section2Items="section2" class="my-12" />

        <Section3 :section3Items="section3" class="my-12" />
    
        <Footer/>
        
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Carosuel from '@/components/Carosuel.vue'
import Section1 from '@/components/Section1.vue'
import Section2 from '@/components/Section2.vue'
import Section3 from '@/components/Section3.vue'


export default {
    name: 'ConsigueFreelancer',
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
              { img: require('@/assets/group.jpg'), text:'¡Busca un freelancer ya mismo!'},
              { img: require('@/assets/team.jpg'), text:'Profesionales listos para trabajar contigo'}
            ],
            //datos que el componente Section1 debe renderizar
            section1:{
                title: 'Publica un proyecto y comienza a recibir propuestas',
                subtitle: ['Describe lo que necesitas y tu presupuesto', 'Recibe propuestas inmediatamente'],
                btn: { text: 'Buscar freelancer', route: '/login'},
                img: require('@/assets/SitReadingDoodle.png')
            },
            //datos que el componente Section2 debe renderizar
            section2:[
              { icon: 'group', text:'Tú eliges con quién quieres trabajar y el precio que estás dispuesto a pagarle.'},
              { icon: 'emoji_people', text:'Analiza los candidatos y sus calificaciones de trabajos anteriores.'},
              { icon: 'thumb_up_alt', text:'Puedes calificar la calidad del trabajo de tu freelancer.'},
            ],
             //datos que el componente Section3 debe renderizar
            section3:{
                title: '¿Ya estás listo para publicar tu proyecto?',
                btn: { text: 'Publica tu proyecto ahora', route: '/login'},
                img: require('@/assets/SleekDoodle.png')
            },   
        }
    },
}
</script>