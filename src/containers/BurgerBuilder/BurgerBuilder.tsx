import React, {Component, Fragment} from 'react';
import Burger from 'components/Burger/Burger';
import BurgerIngredientType from 'shared/enums/BurgerIngredientType.enum';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            [BurgerIngredientType.salad]: 0,
            [BurgerIngredientType.bacon]: 0,
            [BurgerIngredientType.cheese]: 0,
            [BurgerIngredientType.meat]: 0,
        }
    };

    render(): JSX.Element {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;