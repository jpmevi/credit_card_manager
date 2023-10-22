import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class ExampleProvider {
  constructor(private httpService: HttpService) {}
  /**
   * Return a movie info from TMDB API
   * @param {number} id
   * @returns {object}
   */
  async getMoviesById(id: number) {
    const apiKey = process.env.API_KEY_EXAMPLE; //1675e5e75b5782bce4da65e1d7623db9
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      console.log('Error', error.response);
      return error.response;
    }
  }
}
