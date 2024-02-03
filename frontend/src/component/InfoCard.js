import FeaturedPost from '../component/FeaturedPost';
import Coffee_pour from '../picture/coffee_pour.jpg'

function InfoCard({ name, information }){

    return(
        <FeaturedPost 
            title = { name } 
            description = { information }
            image = {Coffee_pour}
            imageLabel = 'Image Text'
        />
    )
}

export default InfoCard;