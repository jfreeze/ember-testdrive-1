require 'sinatra'
require 'json'

JSONDATA = {
  posts: [
    {
      id: 1,
      title: "Rails is Omakase",
      author: "dh2",
      publishedAt: Time.now,
      intro: "This is the intro",
      extended: "alsfj slkjfasl;f jasl;fj asl;fj as;lfj als;fj a;lsfj"
    },
    {
      id: 2,
      title: "The Parley Letter",
      author: "dh3",
      publishedAt: Time.now,
      intro: "More of This is the intro",
      extended: "the **quick** brown _fox_ jumped over the ...\n\nHeader\n=\nHeader2\n-\nmore stufffj a;lsfj"
    }
  ]
}

get '/' do
  redirect '/index.html'
end

get '/posts' do
  content_type :json
  JSONDATA.to_json
end

get '/posts/:id' do
  content_type :json
  JSONDATA[params[:id].to_i-1].to_json
end


