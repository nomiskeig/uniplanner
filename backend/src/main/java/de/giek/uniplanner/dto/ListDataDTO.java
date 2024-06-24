package de.giek.uniplanner.dto;

import java.util.List;

public class ListDataDTO<G> {
        private List<G> data;
        private boolean success;
		public List<G> getData() {
			return data;
		}
		public void setData(List<G> data) {
			this.data = data;
		}
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}

}


