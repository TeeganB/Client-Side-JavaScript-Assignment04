// Add student info
document.addEventListener("DOMContentLoaded", () => {
    const studentId = "1263104";
    const studentName = "Teegan Buttigieg"; 
    document.getElementById("studentInfo").textContent = `Student: ${studentName}, ID: ${studentId}`;
  });
  
  function searchYouTube() {
    const query = document.getElementById("searchInput").value;
    const apiKey = "AIzaSyC8_gqbgadAmOM5txA8AubcOO2AAWHhth8"; // MY YOUTUBE API KEY

    const maxResults = 20;
  
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";
  
        if (!data.items || data.items.length === 0) {
          resultsDiv.innerHTML = "<p>No videos found.</p>";
          return;
        }
  
        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const link = `https://www.youtube.com/watch?v=${videoId}`;
            const thumbnailUrl = item.snippet.thumbnails.high.url; // You can also use medium or default
          
            const div = document.createElement("div");
            div.classList.add("result-item");
          
            div.innerHTML = `
              <a href="${link}" target="_blank">
                <img src="${thumbnailUrl}" alt="Video thumbnail" style="width:100%; max-width:400px; border-radius:8px;" />
                <p>${title}</p>
              </a>
            `;
            resultsDiv.appendChild(div);
          });
      })
      .catch(error => {
        console.error("API error:", error);
        document.getElementById("results").textContent = "Failed to fetch videos.";
      });
  }