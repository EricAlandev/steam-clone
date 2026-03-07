

export const pullGames = async (id: string, token: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/${id}/carrinho/api`, {
          method: 'GET',
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
          }
        })

        const resposta = await response.json();

        return resposta; 
      }

      catch(error){
        console.log(error);
      }
}

export const AddGameCart = async(idGame: number, idUser: string, token: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/${idUser}/carrinho/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
            body: JSON.stringify({
            idJogo: idGame
          })
        })

      }

      catch(error){
        console.log(error);
      }
}


export const RemoveGamesCart = async(idGame: number, idUser: string, token: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/${idUser}/carrinho/api/?idJogo=${idGame}`, {
          method: 'DELETE',
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
          }
        });
        
      }

      catch(error){
        console.log(error);
      }
}


export const BuyGamesInCart = async(idUser: string, token: string) => {
  try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/usuario/${idUser}/carrinho/pay/api`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
      });
      
    }

    catch(error){
      console.log(error);
    }
}
